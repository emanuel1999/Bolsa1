const Character=require('../database/model/Character');
const Movie=require('../database/model/Movie');


exports.getCharacter= async (req,res)=>{
    
      await Character.findAll({
          attributes: ['image', 'name']
        }).then(Character =>{
          res.status(200).json(Character);
      }).catch(err => {
        res.status(400).json("error for Get Character")
      }
    )
  }


exports.createCharacter=async (req,res)=>{
  const { name, age, weight, history, image } = req.body;

  await Character.create({
    name:name,
    age:age,
    weight:weight,
    history:history,
    image:image,
  }).then(Character =>{
    res.status(200).json(Character);
}).catch(err => {
  res.status(400).json("error of  create Character for: "+ err)
    
})
}
exports.editCharacter=async (req,res)=>{
  const { name, age, weight, history, image } = req.body;
  await Character.update({
    name:name,
    age:age,
    weight:weight,
    history:history,
    image:image,
    
}, {
    where:{
      id:req.params.id
   }
}).then(Character=>{
  res.status(201).json('Update');
}).catch(err => {
  res.status(404).json('Not Update because: ' + err)
})
    
}
exports.deleteCharacter=async(req,res)=>{
  await Character.destroy({
    where:{
      id:req.params.id
    }
  }).then(result=>{
    if (result==1){
      res.status(204).json("Correct Delete user:" +result)
  } else{
      throw new err();
  }
  }).catch(err => {
    res.status(404).json('Not Delate because: ' + err)
  })
}

/*
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
})*/