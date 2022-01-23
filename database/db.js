
const {Sequelize}=require('sequelize');
const {database}= require('./config');

const sequelize= new Sequelize(
    database.database,
    database.user,
    database.password,{
        host:database.host,
        port:3306,
        dialect:"mysql"
    }
)
module.exports= sequelize;