const Character=require('../database/model/Character');
const Movie=require('../database/model/Movie');
const associations=require('../database/associations');
const Gender = require('../database/model/Gender');

exports.createGender = (req, res) => {
  const { name, image } = req.body;
  Gender.create({
    name,
    image,
  }).then((gender) => {
    res.json({gender: gender})
      .catch((error) => {
        res.status(500).json({
          msg: "something wrong" + error,
        });
      });
  });
};