const express=require('express');
const { where } = require('sequelize/dist');
const Movie = require('../database/model/Movie');
const Gender = require('../database/model/Gender');
const Character=require('../database/model/Character');
const associations= require('../database/associations');
const MovieController=require('../controllers/movieController')
const authController=require('../controllers/authController')
const router = express.Router();


//show image and name
router.get('/movies',authController.isAuthenticated,MovieController.getMovie);
//Created
router.post('/createMovie',authController.isAuthenticated,MovieController.createMovie);
//Edit
router.put('/editMovie/:id',authController.isAuthenticated,MovieController.editMovie);
//Delate
router.delete('/delateMovie/:id',authController.isAuthenticated,MovieController.deleteMovie);

module.exports=router;