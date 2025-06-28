const { Pool } = require('pg');

exports.handler = async () => {
  const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false },
  });

  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS vacancies (
        id SERIAL PRIMARY KEY,
        company_name VARCHAR(255) NOT NULL,
        category BOOLEAN DEFAULT true,
        notification_date DATE,
        app_start_date DATE NOT NULL,
        app_end_date DATE NOT NULL,
        admit_card_date DATE,
        total_vacancy INTEGER NOT NULL,
        apply TEXT NOT NULL,
        syllabus_and_edu TEXT,
        admit_card TEXT,
        result TEXT,
        download_notification TEXT,
        download_result TEXT,
        download_admit_card TEXT
      );
    `);

    return {
      statusCode: 200,
      body: JSON.stringify({ message: "Database initialized" }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
    };
  } finally {
    await pool.end();
  }
};