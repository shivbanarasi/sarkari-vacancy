const express = require('express');
require('dotenv').config();
const path = require('path');
const serverless = require('serverless-http');
const bodyParser = require('body-parser');

const app = express();

// Database connection
const pool = require('./utils/database');

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// View engine setup
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '../../public/views'));

// Static files
app.use(express.static(path.join(__dirname, '../../public')));

// Routes
const router = require('./routes/route');
app.use('/.netlify/functions/app', router); // API endpoint
app.use('*', (req, res) => res.sendFile(path.join(__dirname, '../../public/index.html'))); // Frontend fallback

// Database connection test
pool.query('SELECT NOW()')
  .then(res => console.log('Database connected at:', res.rows[0].now))
  .catch(err => console.error('Database connection failed:', err));

module.exports.handler = serverless(app);