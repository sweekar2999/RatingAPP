const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL
});

pool.connect()
  .then(() => console.log('PostgreSQL connected ✅'))
  .catch(err => console.error('Connection error ❌', err.stack));

module.exports = pool;
