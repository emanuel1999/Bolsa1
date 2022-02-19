const Character=require('../database/model/Character');
const Movie=require('../database/model/Movie');
const associations=require('../database/associations');
const Gender = require('../database/model/Gender');
const fs=require('fs')
const multer=require ('multer');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
      cb(null, 'images/movie')
  },
  filename: function (req, file, cb) {
      const name=file.originalname;
      cb(null,`${name.toLowerCase()}`)
  }
})
const upload = multer({ storage: storage })

exports.upload =upload.single('image')

exports.detailMovie=async(req,res)=>{
  const id=req.params.id;
  Movie.findByPk(id,{
    include:[{
      model:Character,
      attributes:['name'],
      through:{ attributes:[] } 
  
    }]
  }).then(Movie=>{
    res.json(Movie);
  }).catch(err=>{
    res.json(err)
  })

}

exports.deleteMovie=async(req,res)=>{
  await Movie.findAll({
    attributes: ['image'],
    where:{
      id:req.params.id
    }
  }).then(result=>{
    //res.json(result[0].image)
    const imageName=result[0].image
    fs.unlinkSync('./images/character/'+imageName)
    
  }).then(()=>{
    Movie.destroy({
    where:{
      id:req.params.id
      }
    })
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

exports.createMovie=async (req,res)=>{
  const { title, qualification, gender_id} = req.body;
  const image=req.file.originalname.toLowerCase();
  await Movie.create({
    title:title,
    image:image,
    qualification:qualification,
    gender_id,
  }).then(nMovie=>{
      if(req.body.id){
        nMovie.addCharacter(req.body.id)
        res.status(200).json("Movie Created with association"+ nMovie)
      }else{
        res.status(200).json("Movie Created without association"+nMovie)
      }
  }).catch(err=>{
    res.json(err)
  })
}

exports.findMovie=async(req,res)=>{
  if(req.query.title){
  await Movie.findAll({
    where:{
        title:req.query.title
    }
  }).then((Movie) => res.json(Movie));
} else if (req.query.gender){
  await Movie.findAll({
    where:{
      gender_id:req.query.gender
    }
    
  }).then((Movie) => res.json(Movie));
}else if (req.query.ASC){
  await Movie.findAll({
    order:[
      ['createdAt','ASC']
    ]
    
  }).then((Character) => res.json(Character));

}else if(req.query.DESC){
  await Movie.findAll({
    order:[
      ['createdAt','DESC']
    ]
  })
}else  {
    await Movie.findAll({
    attributes: ['image', 'title','createdAt']
    }).then(Movie =>{
    res.status(200).json(Movie);
    }).catch(err => {
    res.status(400).json("error for Get Movie")
    })
  }
}
exports.editMovie=async (req,res)=>{
    const { title, qualification, gender_id,image } = req.body;
    await Movie.update({
      title:title,
      qualification:qualification,
      gender_id:gender_id,
      image:image,
    
  }, {
      where:{
        id:req.params.id
    }
  }).then(Movie=>{
    res.status(201).json('Update 2');
  }).catch(err => {
    res.status(404).json('Not Update because: ' + err)
  })
    
}
