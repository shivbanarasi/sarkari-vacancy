const express = require('express');
const route = express.Router();
const multer = require('multer');
const path = require('path');

// Correct relative path to controller
const adminController = require('../controllers/admin');

// Configure multer for file uploads
const storage = multer.memoryStorage();
const upload = multer({ 
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 } // 5MB limit
});

// Routes
route.get('/', (req, res) => {
  res.send('Vacancy API is running');
});

// Admin routes
route.post('/admin', upload.single('syllabusAndEdu'), adminController.saveData);
route.get('/views/display/:id', adminController.getdatatodisplay);
route.get('/views/index', adminController.getdatatoindex);
route.get('/views/update', adminController.update);
route.post('/views/search/', adminController.search);
route.get('/views/updating/:id', adminController.updating);
route.post('/views/updating/updateData/:id', upload.single('syllabusAndEdu'), adminController.updateData);

module.exports = route;