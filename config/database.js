var Sequelize=require('sequelize');
module.exports=new Sequelize('cremill','root','',{
  host: 'localhost',
  dialect: 'mysql',
  operatorsAliases: false
});



