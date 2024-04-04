const express=require('express');
const path=require('path')
const app=express();
const serverless=require('serverless-http')
const route=require('./route/route')
const bodyParser=require('body-parser')
const Sequelize=require('./util/database');
const { toUSVString } = require('util');
const port=3000;

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))

app.set('view engine',"ejs")

app.use("/.netlify/views",express.static(path.join(__dirname,'./','views')))
app.use("/.netlify",route)

Sequelize.sync()
module.exports.handler=serverless(app)

// app.listen(port,()=>{
//     console.log(`running over : ${port}`)
// })
