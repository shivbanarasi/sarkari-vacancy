const express=require('express')
const route=express.Router();
const adminController=require('../controller/admin')
const multer=require('multer');

const upload=multer({storage:multer.memoryStorage()})

route.get('/',(req,res)=>{
    res.send('hello')
})

route.post('/admin',upload.single('syllabusAndEdu'),adminController.saveData)
route.get('/views/display/:id',adminController.getdatatodisplay)
route.get('/views/index',adminController.getdatatoindex)
route.get('/views/update',adminController.update)
route.post('/views/search/',adminController.search)
route.get('/views/updating/:id',adminController.updating)
route.post('/views/updating/updateData/:id',upload.single('syllabusAndEdu'),adminController.updateData)

module.exports=route;