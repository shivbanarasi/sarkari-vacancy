const express = require('express');
const path = require('path');
const serverless = require('serverless-http');
const route = require('../../route/route');
const bodyParser = require('body-parser');
const Sequelize = require('../../util/database');

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

// Database sync
Sequelize.sync()
  .then(() => console.log("Database synced"))
  .catch(err => console.error("DB sync error:", err));

module.exports.handler = serverless(app);