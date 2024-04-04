const Sequelize=require('sequelize');
const sequelize=require('../util/database');
const Vacancy=sequelize.define('vacancy',{
   
    companyName:{
        type:Sequelize.STRING,
        allowNull:false,
    },
   
    category:{
        type:Sequelize.STRING,
        allowNull:false,
    },
    notificationDate:{
        type:Sequelize.DATE,
        allowNull:true,
    } ,
    appStartDate:{
        type:Sequelize.DATE,
        allowNull:false,
    },
    admitCardDate:{
        type:Sequelize.DATE
    },
    admitCard:{
        type:Sequelize.STRING
    },
    result:{
        type:Sequelize.STRING
    },
    appEndDate:{
        type:Sequelize.DATE,
        allowNull:false,
    },
    totalVacancy:{
        type:Sequelize.INTEGER,
        allowNull:false,
    },
    apply:{
        type:Sequelize.STRING,
        allowNull:false,
    },
    syllabusAndEdu:{
        type:Sequelize.TEXT('long'),
    },
    downloadNotification:{
        type:Sequelize.STRING,
    },
    downloadresult:{
        type:Sequelize.STRING
    },
    downloadadmitcard:{
        type:Sequelize.STRING
    }
   
   
}); 


console.log(Vacancy===sequelize.models.vacancyinput)
console.log('this is expence model')

module.exports=Vacancy;