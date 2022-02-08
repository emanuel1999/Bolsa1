const { Literal } = require('sequelize/dist/lib/utils');
const Character=require('../database/model/Character');
const { options } = require('../database/model/Movie');
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

exports.detailCharcater=async(req,res)=>{
  const id=req.params.id;
  Character.findByPk(id,{
    include:[{
      model:Movie,
      attributes:['id','title','qualification'],
      through:{ attributes:[] } 
  
    }]
  }).then(Character=>{
    res.json(Character);
  }).catch(err=>{
    res.json(err)
  })

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

exports.findCharacter=async(req,res)=>{
  if(req.query.age){
  await Character.findAll({
    where:{
        age:req.query.age
    }
  }).then((Character) => res.json(Character));
} else if (req.query.name){
  await Character.findAll({
    where:{
       name:req.query.name
    }
  }).then((Character) => res.json(Character));
}else if (req.query.movies){
  await Character.findAll({
    include:[{
      model:Movie,
    where:
      {id:req.query.movies,},
      attributes:[('title')],
      through:{ attributes:[] } 
  
    }]
    
  }).then((Character) => res.json(Character));

}else {
  res.status(404).json("Error in parameter query")
}

}