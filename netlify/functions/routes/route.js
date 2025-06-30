
const express = require('express');
const router = express.Router();
const multer = require('multer');
const adminController = require('../controllers/admin');

// Enhanced file upload configuration
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { 
    fileSize: 5 * 1024 * 1024, // 5MB
    files: 1
  },
  fileFilter: (req, file, cb) => {
    if (file.fieldname === 'syllabusAndEdu') {
      const allowedTypes = [
        'application/pdf',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        'image/jpeg',
        'image/png'
      ];
      cb(null, allowedTypes.includes(file.mimetype));
    } else {
      cb(new Error('Unexpected field'));
    }
  }
});

// Error handling middleware (add this new function)
const handleUploadErrors = (err, req, res, next) => {
  if (err) {
    return res.status(400).json({
      success: false,
      message: err.message.includes('Unexpected field') 
        ? 'Invalid file field name' 
        : err.message
    });
  }
  next();
};

// Modified routes with error handling
router.post(
  '/admin', 
  upload.single('syllabusAndEdu'),
  handleUploadErrors, // Add this line
  adminController.saveData
);

router.post(
  '/views/updating/updateData/:id',
  upload.single('syllabusAndEdu'),
  handleUploadErrors, // Add this line
  adminController.updateData
);


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