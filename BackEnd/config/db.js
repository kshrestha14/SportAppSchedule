const mongoose = require('mongoose');
const Schedule = require('../models/Schedule');

const connectDB = async () => {
  if (!process.env.MONGO_URI) {
    throw new Error('MONGO_URI is missing. Add it to the .env file in the project root.');
  }

  const conn = await mongoose.connect(process.env.MONGO_URI);
  const { host, name } = conn.connection;
  const count = await Schedule.countDocuments();

  const target = process.env.MONGO_URI.includes('mongodb+srv') ? 'MongoDB Atlas (cloud)' : 'local MongoDB';

  console.log(`MongoDB connected (${target})`);
  console.log(`  Host:       ${host}`);
  console.log(`  Database:   ${name}`);
  console.log(`  Collection: schedules (${count} document${count === 1 ? '' : 's'})`);
};

module.exports = connectDB;
