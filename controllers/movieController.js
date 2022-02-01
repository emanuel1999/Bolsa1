const Character=require('../database/model/Character');
const Movie=require('../database/model/Movie');
const associations=require('../database/associations');
const Gender = require('../database/model/Gender');

exports.getMovie=async (req,res)=>{
    await Movie.findAll({
     attributes: ['image', 'title','createdAt']
    }).then(Movie =>{
     res.status(200).json(Movie);
    }).catch(err => {
    res.status(400).json("error for Get Movie")
  })
}

