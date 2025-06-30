const express = require('express');
const router = express.Router();
const multer = require('multer');
const adminController = require('../controllers/admin');

// File upload configuration
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024 } // 5MB
});

// API Routes
router.get('/', (req, res) => res.json({ status: 'API running' }));
router.post('/admin', upload.single('syllabusAndEdu'), adminController.saveData);
router.get('/views/display/:id', adminController.getdatatodisplay);
router.get('/views/index', adminController.getdatatoindex);
router.get('/views/update', adminController.update);
router.post('/views/search/', adminController.search);
router.get('/views/updating/:id', adminController.updating);
router.post('/views/updating/updateData/:id', upload.single('syllabusAndEdu'), adminController.updateData);

module.exports = router;