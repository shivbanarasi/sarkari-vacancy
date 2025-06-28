const pool = require('../util/database');
const { upload } = require('../middleware/multer-config'); // Assuming you have this

module.exports = {
  // Save new vacancy
  saveData: async (req, res) => {
    try {
      const syllabusAndEdu = req.file ? req.file.buffer.toString('base64') : null;
      const {
        cname, totalvacancy, notificationdate, 
        applicationstartdate, apply, applicationenddate,
        admitcarddate, admitcard, result,
        downloadadmitcard, downloadresult, downloadNotification
      } = req.body;

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
        cname, true, notificationdate, applicationstartdate,
        applicationenddate, admitcarddate, totalvacancy, apply,
        syllabusAndEdu, admitcard, result, downloadNotification,
        downloadresult, downloadadmitcard
      ];

      const { rows } = await pool.query(query, values);
      console.log('New vacancy created:', rows[0]);
      
      res.redirect('/admin.html');
    } catch (err) {
      console.error('Error saving data:', err);
      res.status(500).send('Server Error');
    }
  },

  // Get data for display page
  getdatatodisplay: async (req, res) => {
    try {
      const companyName = req.params.id;
      
      const { rows } = await pool.query(
        `SELECT * FROM vacancies 
         WHERE company_name = $1 
         ORDER BY app_start_date DESC 
         LIMIT 10`,
        [companyName]
      );

      res.render('display', {
        title: rows[0]?.company_name || 'Not Found',
        response: rows
      });
    } catch (err) {
      console.error('Error fetching data:', err);
      res.status(500).render('error', { message: 'Database error' });
    }
  },

  // Get all vacancies for index page
  getdatatoindex: async (req, res) => {
    try {
      const { rows } = await pool.query(
        `SELECT * FROM vacancies ORDER BY app_start_date DESC`
      );
      res.status(200).json(rows);
    } catch (err) {
      console.error('Error fetching vacancies:', err);
      res.status(500).json({ error: 'Database error' });
    }
  },

  // Render update page
  update: (req, res) => {
    res.render('update', { response: [] });
  },

  // Search for vacancies
  search: async (req, res) => {
    try {
      const { updateSearch } = req.body;
      const { rows } = await pool.query(
        `SELECT * FROM vacancies WHERE company_name ILIKE $1`,
        [`%${updateSearch}%`]
      );
      res.render('update', { response: rows });
    } catch (err) {
      console.error('Search error:', err);
      res.render('update', { response: [] });
    }
  },

  // Get single vacancy for updating
  updating: async (req, res) => {
    try {
      const id = req.params.id;
      const { rows } = await pool.query(
        `SELECT * FROM vacancies WHERE id = $1`,
        [id]
      );
      res.render("admin", {
        response: rows,
        title: "update",
        id: id
      });
    } catch (err) {
      console.error('Error fetching record:', err);
      res.redirect('/admin.html');
    }
  },

  // Update vacancy data
  updateData: async (req, res) => {
    try {
      const id = req.params.id;
      const syllabusAndEdu = req.file ? req.file.buffer.toString('base64') : null;
      const {
        cname, totalvacancy, notificationdate,
        applicationstartdate, apply, applicationenddate,
        admitcarddate, admitcard, result,
        downloadadmitcard, downloadresult, downloadNotification
      } = req.body;

      // First get existing data
      const { rows: [existing] } = await pool.query(
        `SELECT * FROM vacancies WHERE id = $1`,
        [id]
      );

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
        cname || existing.company_name,
        notificationdate || existing.notification_date,
        applicationstartdate || existing.app_start_date,
        applicationenddate || existing.app_end_date,
        admitcarddate || existing.admit_card_date,
        totalvacancy || existing.total_vacancy,
        apply || existing.apply,
        syllabusAndEdu || existing.syllabus_and_edu,
        admitcard || existing.admit_card,
        result || existing.result,
        downloadNotification || existing.download_notification,
        downloadresult || existing.download_result,
        downloadadmitcard || existing.download_admit_card,
        id
      ];

      await pool.query(query, values);
      res.redirect('/admin.html');
    } catch (err) {
      console.error('Update error:', err);
      res.redirect('/admin.html');
    }
  }
};