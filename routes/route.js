const express = require('express')
const route = express.Router();
const adminController = require('../controller/admin')
const multer = require('multer');
const path = require('path');

const upload = multer({ storage: multer.memoryStorage() })

// API Routes
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