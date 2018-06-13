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
        type:Sequelize.STRING,
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

var client=connection.define('client',{
    cid:{
        primaryKey:true,
        allowNull:false,
        autoIncrement:true,
        type:Sequelize.INTEGER
    },
    username:{
        type:Sequelize.STRING,
        allowNull:false,
        unique:true
    },
    password:{
        type:Sequelize.BLOB,
        allowNull:false,
    },
    email:{
        type:Sequelize.STRING,
        allowNull:false,
        unique:true
    },
    phonenumber:{
        type:Sequelize.STRING,
        unique:true
    },
    nameoforganization:{
        type:Sequelize.STRING,
        allowNull:true,
        defaultValue:null
    },
    job:{
        type:Sequelize.STRING,
        allowNull:true,
        default:null
    },
    location:{
        type:Sequelize.STRING,
        allowNull:false,
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
    partner,client,connection
}