const express=require('express');
const { where } = require('sequelize/dist');
const Character = require('../database/model/Character');
const router = express.Router();


//show image and name
router.get('/characters',async (req,res)=>{
     await Character.findAll({
        attributes: ['image', 'name']
      }).then(Character =>{
        res.status(200).json(Character);
    }).catch(err => {
      res.status(400).json(err)
    })
    
});
//Created
router.post('/createCharacter', (req,res)=>{
   Character.create({
      image:req.body.image,
      name:req.body.name,
      age:req.body.age,
      weight:req.body.weight,
      history:req.body.history,
      assMovie:req.body.assMovie
  }).then(Character=>{
    res.status(201).send('Created')
  }).catch(err => {
    res.status(400).json('Not Created because: ' +err);
})
})
//Edit
router.put('/editCharacter/:id', async (req,res)=>{
  await Character.update({
      image:req.body.image,
      name:req.body.name,
      age:req.body.age,
      weight:req.body.weight,
      history:req.body.history,
      assMovie:req.body.assMovie
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