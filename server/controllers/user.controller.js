const pool = require('../config/db.js');

const getStoresForUser = async (req, res) => {
  try {
    const { name, address } = req.query;
    const userId = req.user.id;

    let query = `
      SELECT s.id, s.name, s.address,
      ROUND(AVG(r.rating), 2) as average_rating,
      ur.rating as user_rating
      FROM stores s
      LEFT JOIN ratings r ON s.id = r.store_id
      LEFT JOIN ratings ur ON s.id = ur.store_id AND ur.user_id = $1
      WHERE 1=1
    `;
    const values = [userId];

    if (name) {
      values.push(`%${name}%`);
      query += ` AND s.name ILIKE $${values.length}`;
    }

    if (address) {
      values.push(`%${address}%`);
      query += ` AND s.address ILIKE $${values.length}`;
    }

    query += ` GROUP BY s.id, ur.rating ORDER BY s.id ASC`;

    const result = await pool.query(query, values);
    res.json(result.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Server error' });
  }
};

const submitRating = async (req, res) => {
    try {
      const { store_id, rating } = req.body;
      const user_id = req.user.id;
  
      if (!store_id || !rating)
        return res.status(400).json({ message: 'Store ID and rating are required' });
  
      if (rating < 1 || rating > 5)
        return res.status(400).json({ message: 'Rating must be between 1 and 5' });

      // Verify store exists
      const storeCheck = await pool.query('SELECT id FROM stores WHERE id = $1', [store_id]);
      if (storeCheck.rows.length === 0) {
        return res.status(404).json({ message: 'Store not found' });
      }
  
      // Check if user already rated this store
      const existing = await pool.query(
        'SELECT * FROM ratings WHERE user_id = $1 AND store_id = $2',
        [user_id, store_id]
      );
  
      if (existing.rows.length > 0) {
        // Update rating
        await pool.query(
          'UPDATE ratings SET rating = $1, updated_at = CURRENT_TIMESTAMP WHERE user_id = $2 AND store_id = $3',
          [rating, user_id, store_id]
        );
        res.json({ message: 'Rating updated successfully' });
      } else {
        // Insert rating
        await pool.query(
          'INSERT INTO ratings (user_id, store_id, rating, created_at) VALUES ($1, $2, $3, CURRENT_TIMESTAMP)',
          [user_id, store_id, rating]
        );
        res.json({ message: 'Rating submitted successfully' });
      }
    } catch (err) {
      console.error('Rating submission error:', err.message);
      res.status(500).json({ message: 'Server error', error: err.message });
    }
};
  
module.exports = {
    getStoresForUser,
    submitRating
};