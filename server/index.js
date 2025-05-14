const express = require('express');
const cors = require('cors');
const app = express();
const pool = require('./config/db.js');  // Import the database connection
const authRoutes = require('./routes/auth.routes.js');
const adminRoutes=require('./routes/admin.routes.js');
const userRoutes=require('./routes/user.routes.js');
const ownerRoutes=require('./routes/owner.routes.js');
// Use environment variable for PORT
app.use(cors());
app.use(express.json());
const PORT = process.env.PORT || 3000;



app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/user',userRoutes);
app.use('/api/owner',ownerRoutes);
app.get('/test-db', async (req, res) => {
  try {
    const result = await pool.query('SELECT NOW()');
    res.json({
      status: 'success',
      message: 'Database is connected!',
      timestamp: result.rows[0].now
    });
  } catch (err) {
    res.status(500).json({
      status: 'error',
      message: 'Database connection failed',
      error: err.message
    });
  }
});

app.get('/', (req, res) => {
  res.send('Hello from Express!');
});

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});