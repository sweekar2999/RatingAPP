const pool = require('../config/db.js');

const getOwnerDashboard = async (req, res) => {
  try {
    const owner_id = req.user.id;

    // Get the store owned by the logged-in owner
    const storeRes = await pool.query('SELECT id, name FROM stores WHERE owner_id = $1', [owner_id]);
    const store = storeRes.rows[0];

    if (!store) return res.status(404).json({ message: 'No store assigned to this owner' });

    const ratingsRes = await pool.query(`
      SELECT u.name AS user_name, u.email, r.rating
      FROM ratings r
      JOIN users u ON r.user_id = u.id
      WHERE r.store_id = $1
    `, [store.id]);

    const avgRes = await pool.query(`
      SELECT ROUND(AVG(rating), 2) AS average_rating FROM ratings WHERE store_id = $1
    `, [store.id]);

    res.json({
      store_id: store.id,
      store_name: store.name,
      average_rating: avgRes.rows[0].average_rating || 0,
      ratings: ratingsRes.rows
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { getOwnerDashboard };