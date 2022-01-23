const path = require('path');
const dotenv = require('dotenv');
dotenv.config({path: './env/.env'})

module.exports={
    database:{
    host : process.env.DB_HOST,
    user : process.env.DB_USER,
    password : process.env.DB_PASS, 
    database : process.env.DB_DATABASE,
    port: 3307
    }
}