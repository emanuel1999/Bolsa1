const Character=require('../database/model/Character');
const Movie=require('../database/model/Movie');
const associations=require('../database/associations');
const Gender = require('../database/model/Gender');
const fs=require('fs')
const cors= require('cors');
const multer=require ('multer');
const { networkInterfaces } = require('os');
const { nextTick } = require('process');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
      cb(null, 'images/gender')
  },
  filename: function (req, file, cb) {
      const name=file.originalname;
      cb(null,`${name.toLowerCase()}`)
  }
})

const upload = multer({ storage: storage })

exports.upload =upload.single('image')
exports.delete=async(req,res,next)=>{
  await Gender.findAll({
    attributes: ['image'],
    where:{
      id:req.params.id
    }
  }).then(result=>{
    //res.json(result[0].image)
    const imageName=result[0].image
    fs.unlinkSync('./images/gender/'+imageName)
    
  }).then(()=>{
     Gender.destroy({
      where:{
        id:req.params.id
      }
    })
  }).then(respon=>{
    res.json("Gender Destroy")
  }).catch(err=>{
    res.json("error"+err)
  })
}
/*exports.deleteCharacter=async(req,res)=>{
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
}*/
exports.createGender = async (req, res) => {
  const image=req.file.originalname.toLowerCase();

  const name  = req.body.name;
  await Gender.create({
    name:name,
    image:image
  }).then((gender) => {
    res.json({gender: gender})
    .catch((error) => {
        res.status(500).json(error);
    });
  });
};