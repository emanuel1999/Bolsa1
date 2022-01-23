const express=require('express');
const User = require('../database/model/User');
const router = express.Router();
const authController=require('../controllers/authController')

router.get('/login',authController.getUser);
router.post('/register',authController.createUser);
router.get('/prueba',authController.isAuthenticated);



module.exports = router;