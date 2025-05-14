const bcrypt = require('bcrypt');
const pool = require('../config/db.js');

const addUser = async (req, res) => {
  const { name, email, password, address, role } = req.body;
  console.log('Received user data from frontend:', req.body);

  try {
    // Validate that all fields are provided
    if (!name || !email || !password || !address || !role)
      return res.status(400).json({ message: 'All fields required' });

    // Check the name field for invalid characters/length
    if (name.length < 3 || name.length > 50) {
      return res.status(400).json({ message: 'Name must be between 3 and 50 characters' });
    }

    // Check if name contains any invalid characters (for example, no special characters)
    const nameRegex = /^[a-zA-Z0-9\s]+$/;
    if (!nameRegex.test(name)) {
      return res.status(400).json({ message: 'Name can only contain letters, numbers, and spaces' });
    }

    // Check if email already exists
    const existing = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    if (existing.rows.length > 0)
      return res.status(400).json({ message: 'Email already exists' });

    // Validate the password
    const passwordRegex = /^(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,16}$/;
    if (
      password.length < 8 || 
      password.length > 16 || 
      !passwordRegex.test(password)
    ) {
      return res.status(400).json({ 
        message: 'Password must be 8-16 characters, include at least one uppercase and one special character (!@#$%^&*)'
      });
    }

    // Hash the password
    const hashed = await bcrypt.hash(password, 10);

    // Insert user data into the database
    await pool.query(
      'INSERT INTO users (name, email, password, address, role) VALUES ($1, $2, $3, $4, $5)',
      [name, email, hashed, address, role]
    );

    res.status(201).json({ message: 'User created successfully' });

  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: 'Server error' });
  }
};


const addStore = async (req, res) => {
    const { name, email, address, owner_id } = req.body;
  console.log(req.body);
    try {
      if (!name || !email || !address || !owner_id)
        return res.status(400).json({ message: 'All fields required' });
  
      // Check if email is already used by another store
      const existing = await pool.query('SELECT * FROM stores WHERE email = $1', [email]);
      if (existing.rows.length > 0)
        return res.status(400).json({ message: 'Store email already exists' });
  
      // Check if the owner_id exists and has role = 'owner'
      const owner = await pool.query('SELECT * FROM users WHERE id = $1 AND role = $2', [owner_id, 'owner']);
      if (owner.rows.length === 0)
        return res.status(400).json({ message: 'Owner ID is invalid or not an owner' });
  
      // Insert store
      await pool.query(
        'INSERT INTO stores (name, email, address, owner_id) VALUES ($1, $2, $3, $4)',
        [name, email, address, owner_id]
      );
  
      res.status(201).json({ message: 'Store created successfully' });
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ message: 'Server error' });
    }
  };
  
  const getDashboardStats = async (req, res) => {
    try {
      const totalUsers = await pool.query('SELECT COUNT(*) FROM users');
      const totalStores = await pool.query('SELECT COUNT(*) FROM stores');
      const totalRatings = await pool.query('SELECT COUNT(*) FROM ratings');
  
      res.json({
        totalUsers: parseInt(totalUsers.rows[0].count),
        totalStores: parseInt(totalStores.rows[0].count),
        totalRatings: parseInt(totalRatings.rows[0].count),
      });
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ message: 'Server error' });
    }
  };
  
  const getUsersList = async (req, res) => {
    try {
      const { name, email, address, role } = req.query;
  
      let query = 'SELECT id, name, email, address, role FROM users WHERE 1=1';
      const values = [];
  
      if (name) {
        values.push(`%${name}%`);
        query += ` AND name ILIKE $${values.length}`;
      }
  
      if (email) {
        values.push(`%${email}%`);
        query += ` AND email ILIKE $${values.length}`;
      }
  
      if (address) {
        values.push(`%${address}%`);
        query += ` AND address ILIKE $${values.length}`;
      }
  
      if (role) {
        values.push(role);
        query += ` AND role = $${values.length}`;
      }
  
      query += ' ORDER BY id ASC';
  
      const result = await pool.query(query, values);
      res.json(result.rows);
    } catch (err) {
      console.error(err.message);
      res.status(500).json({ message: 'Server error' });
    }
  };
  
  const getStoresList = async (req, res) => {
    try {
      const { name, email, address } = req.query;
  
      let query = `
        SELECT s.id, s.name, s.email, s.address, u.name as owner_name,
        ROUND(AVG(r.rating), 2) as average_rating
        FROM stores s
        LEFT JOIN users u ON s.owner_id = u.id
        LEFT JOIN ratings r ON s.id = r.store_id
        WHERE 1=1
      `;
      
      const values = [];
  
      if (name) {
        values.push(`%${name}%`);
        query += ` AND s.name ILIKE $${values.length}`;
      }
  
      if (email) {
        values.push(`%${email}%`);
        query += ` AND s.email ILIKE $${values.length}`;
      }
  
      if (address) {
        values.push(`%${address}%`);
        query += ` AND s.address ILIKE $${values.length}`;
      }
  
      query += `
        GROUP BY s.id, u.name
        ORDER BY s.id ASC
      `;
  
      const result = await pool.query(query, values);
      res.json(result.rows);
    } catch (err) {
      console.error(err.message);
      res.status(500).json({ message: 'Server error' });
    }
  };
  
  module.exports = {
    addUser,
    addStore,
    getDashboardStats,
    getUsersList,
    getStoresList
  };