const express = require('express');
require('dotenv').config();
const path = require('path');
const serverless = require('serverless-http');
const route = require('../../route/route');
const bodyParser = require('body-parser');


const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Configure view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '../../public/views'));

// Serve static files from public
app.use('/', express.static(path.join(__dirname, '../../public')));

// Mount routes
app.use('/.netlify/functions/app', route); // All API routes
app.use('/', (req, res) => res.sendFile(path.join(__dirname, '../../public/index.html'))); // Fallback

const pool = require('./util/database');

// Test connection on startup
pool.query('SELECT NOW()')
  .then(res => console.log('✅ Database connected at:', res.rows[0].now))
  .catch(err => {
    console.error('❌ Database connection failed');
    console.error(err.stack);
    process.exit(1); // Optional: Exit if DB is critical
  });

module.exports.handler = serverless(app);