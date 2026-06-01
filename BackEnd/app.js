const path      = require('path');
require('dotenv').config({ path: path.join(__dirname, '..', '.env') });

const express   = require('express');
const morgan    = require('morgan');
const connectDB = require('./config/db');

const app = express();

app.use(morgan('dev'));
app.use(express.json());

const frontEndDir = path.join(__dirname, '..', 'FrontEnd');

app.get('/', (req, res) => {
  res.sendFile(path.join(frontEndDir, 'index.html'));
});
app.get('/admin', (req, res) => {
  res.sendFile(path.join(frontEndDir, 'admin.html'));
});
app.get('/admin.html', (req, res) => res.redirect('/admin'));

app.use('/admin',     require('./routes/adminRoutes'));
app.use('/schedules', require('./routes/scheduleRoutes'));

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Internal server error' });
});

const PORT = process.env.PORT || 5000;

const start = async () => {
  try {
    await connectDB();
    app.listen(PORT, '0.0.0.0', () => console.log(`Server running on http://0.0.0.0:${PORT}`));
  } catch (err) {
    console.error('Failed to start server:', err.message);
    process.exit(1);
  }
};

start();
