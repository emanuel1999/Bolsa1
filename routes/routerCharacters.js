const express=require('express');
const { where } = require('sequelize/dist');
const Character = require('../database/model/Character');
const associations= require('../database/associations');
const characterController=require('../controllers/characterController')
const router = express.Router();


//show image and name
router.get('/characters',characterController.getCharacter);
//Created
router.post('/createCharacter',characterController.createCharacter);
//Edit
router.put('/editCharacter/:id', async (req,res)=>{
  await Character.update({
      image:req.body.image,
      name:req.body.name,
      age:req.body.age,
      weight:req.body.weight,
      history:req.body.history,
      
  }, {
      where:{
        id:req.params.id
     }
  }).then(Character=>{
    res.status(201).json('Update');
  }).catch(err => {
    res.status(404).json('Not Update because: ' + err)
  })
})
//Delate
router.delete('/delateCharacter/:id',async(req,res)=>{
  await Character.destroy({
    where:{
      id:req.params.id
    }
  }).then(result=>{
    if (result==1){
      res.status(204)
  } else{
      throw new err();
  }
  }).catch(err => {
    res.status(404).json('Not Delate because: ' + err)
  })
})


module.exports=router;