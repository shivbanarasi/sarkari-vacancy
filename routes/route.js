const express = require('express')
const route = express.Router();
const adminController = require('../controller/admin')
const multer = require('multer');
const path = require('path');

const upload = multer({ storage: multer.memoryStorage() })

// API Routes
// Add these new routes
route.get('/views/notifications', async (req, res) => {
    try {
        const { rows } = await pool.query(`
            SELECT id, company_name, notification_date, total_vacancy, download_notification
            FROM vacancies
            WHERE download_notification IS NOT NULL
            ORDER BY notification_date DESC
        `);
        res.json(rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

route.get('/views/admitcards', async (req, res) => {
    try {
        const { rows } = await pool.query(`
            SELECT id, company_name, admit_card_date, admit_card, download_admit_card
            FROM vacancies
            WHERE admit_card IS NOT NULL
            ORDER BY admit_card_date DESC
        `);
        res.json(rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

route.get('/views/results', async (req, res) => {
    try {
        const { rows } = await pool.query(`
            SELECT id, company_name, result, download_result
            FROM vacancies
            WHERE result IS NOT NULL
            ORDER BY created_at DESC
        `);
        res.json(rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});
route.post('/admin', upload.single('syllabusAndEdu'), adminController.saveData)
route.get('/views/display/:id', adminController.getdatatodisplay)
route.get('/views/index', adminController.getdatatoindex)
route.get('/views/update', adminController.update)
route.post('/views/search/', adminController.search)
route.get('/views/updating/:id', adminController.updating)
route.post('/views/updating/updateData/:id', upload.single('syllabusAndEdu'), adminController.updateData)

// Add this catch-all route for frontend paths
route.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../../public/index.html'))
})

module.exports = route;