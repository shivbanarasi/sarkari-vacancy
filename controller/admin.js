const express=require('express');
const dataEntry=require("../models/vacanyinput")
const multer=require('multer');

const upload=multer({storage:multer.memoryStorage()})

exports.saveData=(req,res)=>{
    //console.log('hello',req.body.cname);
    const syllabusAndEdu=req.file.buffer.toString('base64');
    const{cname,totalvacancy,notificationdate,applicationstartdate,apply,applicationenddate,admitcarddate,admitcard,result,downloadadmitcard,downloadresult,downloadNotification}=req.body;
    console.log(cname,notificationdate,applicationstartdate);
    

    const response=dataEntry.create({
        companyName:cname,
        category:true,
        appStartDate:applicationstartdate,
        appEndDate:applicationenddate,
        notificationDate:notificationdate,
        totalVacancy:totalvacancy,
        apply:apply,
        syllabusAndEdu:syllabusAndEdu,
        admitCardDate:admitcarddate,
        admitCard:admitcard,
        result:result,
        downloadadmitcard:downloadadmitcard,
        downloadresult:downloadresult,
        downloadNotification:downloadNotification
    })
    console.log(response);
    res.redirect('http://localhost:3000/views/admin.html')
}

exports.getdatatodisplay=(req,res)=>{
    const id =req.params;
    console.log(id)
    console.log(typeof id.id)
    dataEntry.findAll({
        where:{
            companyName:id.id,
        },
        order:[["appStartDate",'DESC']],
        limit:10,
        
    })
    .then(response=>{
        console.log(response);
        res.render('display',{
            title:response[0].companyName,
            response:response
        })
    })
}

exports.getdatatoindex=(req,res)=>{

    dataEntry.findAll()
    .then(response=>{
        console.log(response);
        res.status(200).json(response);
    })
}

exports.update=(req,res)=>{
    res.render('update',{
        response:" "
    })
}

exports.search=(req,res)=>{
    const {updateSearch}=req.body;
    console.log(updateSearch)
    dataEntry.findAll({
        where:{
            companyName:updateSearch
        }
    })
    .then(response=>{
        res.render('update',{
            response:response
        })
    })
   
}

exports.updating=(req,res)=>{
    const id=req.params.id;
    console.log(id);
    dataEntry.findAll({
        where:{
            id:id,
        }
    }).then(response=>{
        console.log(response)
        res.render("admin",{
            response:response,
            title:"update",
            id:id
        })
    })
}

exports.updateData=(req,res)=>{
    const id=req.params.id;
    const syllabusAndEdu=req.file.buffer.toString('base64');
    const{cname,totalvacancy,notificationdate,applicationstartdate,apply,applicationenddate,admitcarddate,admitcard,result,downloadadmitcard,downloadresult,downloadNotification}=req.body;

    const response=dataEntry.update({
        companyName:cname,
        category:true,
        appStartDate:applicationstartdate,
        appEndDate:applicationenddate,
        notificationDate:notificationdate,
        totalVacancy:totalvacancy,
        apply:apply,
        syllabusAndEdu:syllabusAndEdu,
        admitCardDate:admitcarddate,
        admitCard:admitcard,
        result:result,
        downloadadmitcard:downloadadmitcard,
        downloadresult:downloadresult,
        downloadNotification:downloadNotification
    },
    {where:{id:id}})
    .then(response=>{
        console.log(response,"  updated successfully")
        res.redirect('http://localhost:3000/views/admin.html')
    })
}