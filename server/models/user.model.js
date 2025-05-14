// models/user.model.js
const pool = require('../config/db');

const createUser = async ({ name, email, address, password, role }) => {
  const result = await pool.query(
    `INSERT INTO users (name, email, address, password, role) 
     VALUES ($1, $2, $3, $4, $5) RETURNING id, name, email, address, role`,
    [name, email, address, password, role]
  );
  return result.rows[0];
};

const findUserByEmail = async (email) => {
  const result = await pool.query(`SELECT * FROM users WHERE email = $1`, [email]);
  return result.rows[0];
};

module.exports = {
  createUser,
  findUserByEmail,
};
