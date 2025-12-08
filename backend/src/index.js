require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors'); // <-- Add this
const connectDB = require('./utils/db');
const salesRoutes = require('./routes/salesRoutes');

const app = express();

// Enable CORS for your frontend
app.use(cors({
  origin: 'https://retail-sales-frontend.onrender.com', // allow only your frontend
  credentials: true // if you plan to send cookies/auth headers
}));

app.use(express.json());
app.use(morgan('dev'));

// Connect DB
connectDB()
  .then(() => {
    app.use('/api/sales', salesRoutes);

    const PORT = process.env.PORT || 4000;
    app.listen(PORT, () => console.log(`Backend running on ${PORT}`));
  })
  .catch(err => {
    console.error('Failed to connect to DB', err);
  });
