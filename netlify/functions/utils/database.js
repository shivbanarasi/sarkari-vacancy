const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false // Required for Neon
  }
});

// Connection test
pool.on('connect', () => console.log('PostgreSQL connected'));
pool.on('error', err => console.error('PostgreSQL error', err));

module.exports = pool;