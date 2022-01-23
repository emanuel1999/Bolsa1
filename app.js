const express=require('express');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser')
const app=express();
const sequelize= require('./database/db');
const path = require('path');
const PORT=4000;

//Formato Json
app.use(express.json())
// Url Encode
app.use(express.urlencoded({extended:false}));

//separamos las router aparte.
app.use('/auth', require('./routes/routerAuth'));
app.use('/', require('./routes/routerCharacters'));
app.use('/', require('./routes/postRouter'));
//--------
app.use(function(req, res, next) {
    if (!req.user)
        res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
    next();
});

app.listen(4000, async()=>{
    console.log('SERVER UP runnung in http://localhost:400')
    try {
        await sequelize.sync({force:false});
        console.log('Connection has been established successfully.');
      } catch (error) {
        console.error('Unable to connect to the database:', error);
      }
 
     
})