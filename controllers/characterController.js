const { Literal } = require('sequelize/dist/lib/utils');
const Character=require('../database/model/Character');
const Movie=require('../database/model/Movie');
const cors= require('cors');
const multer=require ('multer');
const fs=require('fs')


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
      cb(null, 'images/character')
  },
  filename: function (req, file, cb) {
      const name=file.originalname;
      cb(null,`${name.toLowerCase()}`)
  }
})

const upload = multer({ storage: storage })

exports.upload =upload.single('image')


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
  const { name, age, weight, history} = req.body;
  const image=req.file.originalname.toLowerCase();
  await Character.create({
    name:name,
    age:age,
    weight:weight,
    history:history,
    image:image,
  }).then(nCharacter =>{
    if(req.body.id){
      nCharacter.addMovie(req.body.id)
      res.status(200).json("Movie Created with association"+Character)
    }else{
      res.status(200).json("Movie Created without association"+Character)
    }
    
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
  
  await Character.findAll({
    attributes: ['image'],
    where:{
      id:req.params.id
    }
  }).then(result=>{
    //res.json(result[0].image)
    const imageName=result[0].image
    fs.unlinkSync('./images/character/'+imageName)
    
  }).then(()=>{
    Character.destroy({
    where:{
      id:req.params.id
    }
    })
  }).then(result=>{
    
      res.status(204).json("Correct Delete user:" +result)
    
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