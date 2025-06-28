const pool = require('../util/database');

const Vacancy = {
  async create(data) {
    const query = `
      INSERT INTO vacancies (
        company_name, category, notification_date, app_start_date,
        app_end_date, admit_card_date, total_vacancy, apply,
        syllabus_and_edu, admit_card, result, download_notification,
        download_result, download_admit_card
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14)
      RETURNING *;
    `;
    const values = [
      data.companyName, data.category || true, data.notificationDate,
      data.appStartDate, data.appEndDate, data.admitCardDate,
      data.totalVacancy, data.apply, data.syllabusAndEdu, data.admitCard,
      data.result, data.downloadNotification, data.downloadResult,
      data.downloadAdmitCard
    ];
    const res = await pool.query(query, values);
    return res.rows[0];
  },

  async findAll() {
    const res = await pool.query('SELECT * FROM vacancies ORDER BY app_start_date DESC');
    return res.rows;
  },

  async findByCompany(companyName) {
    const res = await pool.query(
      'SELECT * FROM vacancies WHERE company_name = $1 ORDER BY app_start_date DESC LIMIT 10',
      [companyName]
    );
    return res.rows;
  },

  async update(id, data) {
    const query = `
      UPDATE vacancies SET
        company_name = $1,
        notification_date = $2,
        app_start_date = $3,
        app_end_date = $4,
        admit_card_date = $5,
        total_vacancy = $6,
        apply = $7,
        syllabus_and_edu = $8,
        admit_card = $9,
        result = $10,
        download_notification = $11,
        download_result = $12,
        download_admit_card = $13
      WHERE id = $14
      RETURNING *;
    `;
    const values = [
      data.companyName, data.notificationDate, data.appStartDate,
      data.appEndDate, data.admitCardDate, data.totalVacancy,
      data.apply, data.syllabusAndEdu, data.admitCard, data.result,
      data.downloadNotification, data.downloadResult, data.downloadAdmitCard,
      id
    ];
    const res = await pool.query(query, values);
    return res.rows[0];
  }
};

module.exports = Vacancy;