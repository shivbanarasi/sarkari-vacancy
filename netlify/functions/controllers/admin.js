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
          message: `Missing required fields: ${missingFields.join(', ')}`,
          missingFields
        });
      }

      // Validate dates
      const startDate = new Date(req.body.applicationstartdate);
      const endDate = new Date(req.body.applicationenddate);
      
      if (startDate >= endDate) {
        return res.status(400).json({
          success: false,
          message: 'Application end date must be after start date'
        });
      }

      // Process file upload
      let syllabusFile = null;
      if (req.file) {
        // Validate file type (allow PDF, DOCX, and images)
        const allowedTypes = [
          'application/pdf',
          'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
          'image/jpeg',
          'image/png'
        ];
        
        if (!allowedTypes.includes(req.file.mimetype)) {
          return res.status(400).json({
            success: false,
            message: 'Only PDF, Word, JPEG, and PNG files are allowed'
          });
        }

        syllabusFile = {
          filename: req.file.originalname,
          mimetype: req.file.mimetype,
          size: req.file.size,
          data: req.file.buffer.toString('base64'),
          uploaded_at: new Date().toISOString()
        };
      }

      // Prepare data for database
      const vacancyData = {
        company_name: req.body.cname.trim(),
        notification_date: req.body.notificationdate || null,
        app_start_date: startDate.toISOString(),
        app_end_date: endDate.toISOString(),
        admit_card_date: req.body.admitcarddate ? new Date(req.body.admitcarddate).toISOString() : null,
        total_vacancy: parseInt(req.body.totalvacancy),
        apply: req.body.apply.trim(),
        syllabus_and_edu: syllabusFile ? JSON.stringify(syllabusFile) : null,
        admit_card: req.body.admitcard ? req.body.admitcard.trim() : null,
        result: req.body.result ? req.body.result.trim() : null,
        download_notification: req.body.downloadNotification ? req.body.downloadNotification.trim() : null,
        download_result: req.body.downloadresult ? req.body.downloadresult.trim() : null,
        download_admit_card: req.body.downloadadmitcard ? req.body.downloadadmitcard.trim() : null
      };

      // Database insertion
      const query = `
        INSERT INTO vacancies (
          company_name, notification_date, app_start_date,
          app_end_date, admit_card_date, total_vacancy,
          apply, syllabus_and_edu, admit_card, result,
          download_notification, download_result, download_admit_card
        ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)
        RETURNING 
          id, 
          company_name, 
          to_char(app_start_date, 'YYYY-MM-DD') as app_start_date,
          to_char(app_end_date, 'YYYY-MM-DD') as app_end_date,
          total_vacancy;
      `;

      const { rows } = await pool.query(query, [
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
      ]);

      return res.status(201).json({
        success: true,
        message: 'Vacancy saved successfully',
        data: rows[0],
        timestamp: new Date().toISOString()
      });

    } catch (error) {
      console.error('Database error:', error);
      return res.status(500).json({
        success: false,
        message: 'Internal server error',
        error: error.message,
        timestamp: new Date().toISOString()
      });
    }
  },

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