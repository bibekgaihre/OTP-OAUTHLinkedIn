const Sequelize=require('sequelize');

const connection=new Sequelize('cremill','root','',{
    host:'127.0.0.1',
    dialect:'mysql',
    operatorsAliases:false
})


var partner=connection.define('partner',{
    pid:{
        primaryKey:true,
        allowNull:false,
        autoIncrement:true,
        type:Sequelize.INTEGER
    },
    partnerid:{
        type:Sequelize.STRING,
        allowNull:false,
        unique:true
    },
    password:{
        type:Sequelize.BLOB,
        allowNull:false,
      
    },
    companyemail:{
        type:Sequelize.STRING,
        allowNull:false,
        unique:true
    },
    phonenumber:{
        type:Sequelize.INTEGER,
       unique:true
    },
    nameofagency:{
        type:Sequelize.STRING,
        allowNull:false,
        unique:true
    },
    city:{
        type:Sequelize.STRING,
        allowNull:false
    },
    country:{
        type:Sequelize.STRING,
        allowNull:false
    },
    address:{
        type:Sequelize.STRING,
        allowNull:true
    },
    zipcode:{
        type:Sequelize.INTEGER,
        allowNull:true
    },
    token:{
        type:Sequelize.STRING,
        allowNull:true
    },
    confirmed:{
        type:Sequelize.BOOLEAN,
        defaultValue:false,
        allowNull:false
    }
})

connection.sync();

exports=module.exports={
    partner
}