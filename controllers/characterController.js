const Character=require('../database/model/Character');
const Movie=require('../database/model/Movie');

exports.getCharacter= async (req,res)=>{
    try {
        await Character.findAll({
            attributes: ['image', 'name']
          }).then(Character =>{
            res.status(200).json(Character);
        }).catch(err => {
          res.status(400).json(err)
        })
    } catch (error) {
        res.status(400).json("error for Get Character")
    }
}

exports.createCharacter=async (req,res)=>{
    try {
    const { name, age, weight, history, image } = req.body;
    let addCharacter = await Character.create({
      name,
      age,
      weight,
      history,
      image,
      if(addCharacter){
        res.status(201).json('Created')
      }
    });
    } catch (error) {
        res.status(400).json('Not Created because: ' +err);
    }
}
