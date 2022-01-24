const express=require('express');
const { where } = require('sequelize/dist');
const genderController=require('../controllers/genderController')
const authController=require('../controllers/authController')

const Character = require('../database/model/Character');
const router = express.Router();


//show image and name
router.post('/createGender',authController.isAuthenticated,genderController.createGender);
module.exports=router;