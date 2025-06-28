// util/database.js
const { Pool } = require('pg');

// Netlify automatically injects DATABASE_URL
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false, // Required for Neon's SSL
  },
});

module.exports = pool;