const express=require('express');
const { where } = require('sequelize/dist');
const Movie = require('../database/model/Movie');
const Gender = require('../database/model/Gender');
const Character=require('../database/model/Character');
const associations= require('../database/associations');
const movieController=require('../controllers/movieController')
const authController=require('../controllers/authController')
const router = express.Router();


//show image and name
router.get('/movie',authController.isAuthenticated,movieController.findMovie);
//Created
router.post('/createMovie',authController.isAuthenticated,movieController.upload,movieController.createMovie);
//Edit
router.put('/editMovie/:id',authController.isAuthenticated,movieController.editMovie);
//Delate
router.delete('/deleteMovie/:id',authController.isAuthenticated,movieController.deleteMovie);
//Detail
router.get('/movie/:id',authController.isAuthenticated,movieController.detailMovie);
//Find Movie


module.exports=router;