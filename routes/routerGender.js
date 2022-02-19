const express=require('express');
const { where } = require('sequelize/dist');
const genderController=require('../controllers/genderController');
const authController=require('../controllers/authController');
const Character = require('../database/model/Character');
const router = express.Router();



router.post('/createGender',authController.isAuthenticated,genderController.upload,genderController.createGender);
router.delete('/prueba/:id',authController.isAuthenticated,genderController.delete)
module.exports=router;