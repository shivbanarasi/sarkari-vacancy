// netlify/functions/controllers/admin.js
const pool = require('../utils/database');

module.exports = {
    saveData: async (req, res) => {
        try {
            // Validate required fields
            const requiredFields = ['cname', 'applicationstartdate', 'applicationenddate', 'totalvacancy', 'apply'];
            const missingFields = requiredFields.filter(field => !req.body[field]);
            
            if (missingFields.length > 0) {
                return res.status(400).json({
                    success: false,
                    message: `Missing required fields: ${missingFields.join(', ')}`
                });
            }

            // Process file upload if exists
            let syllabusFile = null;
            if (req.file) {
                syllabusFile = {
                    filename: req.file.originalname,
                    content: req.file.buffer.toString('base64'),
                    mimetype: req.file.mimetype,
                    size: req.file.size
                };
            }

            // Prepare data for database
            const vacancyData = {
                company_name: req.body.cname,
                notification_date: req.body.notificationdate || null,
                app_start_date: req.body.applicationstartdate,
                app_end_date: req.body.applicationenddate,
                admit_card_date: req.body.admitcarddate || null,
                total_vacancy: parseInt(req.body.totalvacancy),
                apply: req.body.apply,
                syllabus_and_edu: syllabusFile ? JSON.stringify(syllabusFile) : null,
                admit_card: req.body.admitcard || null,
                result: req.body.result || null,
                download_notification: req.body.downloadNotification || null,
                download_result: req.body.downloadresult || null,
                download_admit_card: req.body.downloadadmitcard || null
            };

            // Database insertion
            const query = `
                INSERT INTO vacancies (
                    company_name, notification_date, app_start_date,
                    app_end_date, admit_card_date, total_vacancy,
                    apply, syllabus_and_edu, admit_card, result,
                    download_notification, download_result, download_admit_card
                ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)
                RETURNING id;
            `;

            const values = [
                vacancyData.company_name,
                vacancyData.notification_date,
                vacancyData.app_start_date,
                vacancyData.app_end_date,
                vacancyData.admit_card_date,
                vacancyData.total_vacancy,
                vacancyData.apply,
                vacancyData.syllabus_and_edu,
                vacancyData.admit_card,
                vacancyData.result,
                vacancyData.download_notification,
                vacancyData.download_result,
                vacancyData.download_admit_card
            ];

            const { rows } = await pool.query(query, values);

            return res.json({
                success: true,
                message: 'Vacancy saved successfully',
                vacancyId: rows[0].id
            });

        } catch (error) {
            console.error('Database error:', error);
            return res.status(500).json({
                success: false,
                message: 'Failed to save vacancy',
                error: error.message,
                detailedError: process.env.NODE_ENV === 'development' ? error.stack : undefined
            });
        }
    },
    // ... other controller methods


  getdatatodisplay: async (req, res) => {
    try {
      const { id } = req.params;
      const { rows } = await pool.query(
        `SELECT 
          id,
          company_name,
          to_char(notification_date, 'YYYY-MM-DD') as notification_date,
          to_char(app_start_date, 'YYYY-MM-DD') as app_start_date,
          to_char(app_end_date, 'YYYY-MM-DD') as app_end_date,
          total_vacancy,
          apply,
          admit_card,
          result,
          download_notification,
          download_result,
          download_admit_card
         FROM vacancies 
         WHERE company_name = $1 
         ORDER BY app_start_date DESC 
         LIMIT 10`,
        [id]
      );

      if (rows.length === 0) {
        return res.status(404).json({
          success: false,
          message: 'No vacancies found for this company'
        });
      }

      // Parse syllabus data if exists
      const processedRows = rows.map(row => {
        if (row.syllabus_and_edu) {
          try {
            row.syllabus_and_edu = JSON.parse(row.syllabus_and_edu);
          } catch (e) {
            console.error('Error parsing syllabus data:', e);
            row.syllabus_and_edu = null;
          }
        }
        return row;
      });

      return res.json({
        success: true,
        data: processedRows
      });

    } catch (error) {
      console.error('Error fetching data:', error);
      return res.status(500).json({
        success: false,
        message: 'Failed to fetch vacancies'
      });
    }
  }
};