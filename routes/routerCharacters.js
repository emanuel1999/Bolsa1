const express=require('express');
const { where } = require('sequelize/dist');
const Character = require('../database/model/Character');
const associations= require('../database/associations');
const characterController=require('../controllers/characterController')
const authController=require('../controllers/authController')
const router = express.Router();


//show image and name
router.get('/characters',authController.isAuthenticated,characterController.getCharacter);
//Created
router.post('/createCharacter',authController.isAuthenticated,characterController.upload,characterController.createCharacter);
//Edit
router.put('/editCharacter/:id',authController.isAuthenticated,authController.isAuthenticated,characterController.editCharacter);
//Delate
router.delete('/delateCharacter/:id',authController.isAuthenticated,characterController.deleteCharacter);
//Find Character
router.get('/character',authController.isAuthenticated,characterController.findCharacter);
//Detail Character
router.get('/character/:id',authController.isAuthenticated,characterController.detailCharcater);

module.exports=router;