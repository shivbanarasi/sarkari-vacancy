// util/database.js
const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl:process.env.NODE_ENV === 'production' ? {
    rejectUnauthorized: false, // Required for Neon's SSL
  }:false,
});

// Test the connection immediately
pool.query('SELECT NOW()')
  .then(() => console.log('✅ Connected to Neon PostgreSQL'))
  .catch(err => console.error('❌ Connection error:', err));

module.exports = pool;