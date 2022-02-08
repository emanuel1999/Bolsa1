const {Model, DataTypes}=require('sequelize');
const sequelize=require('./db');
const Character = require('../database/model/Character');
const Gender = require('../database/model/Gender');
const Movies = require('../database/model/Movie');


Gender.hasMany(Movies,{as: "movies", foreignKey: "gender_id"});
Movies.belongsTo(Gender,{ as: "gender", foreignKey:"gender_id"});

//Movies.belongsToMany(Character, {as:'movies', through: 'Characters_Movie',foreignKey:"movie_id" });
//Character.belongsToMany(Movies, {as:'characters', through: 'Characters_Movie',foreignKey:"character_id" });
Movies.belongsToMany(Character, { through: 'Characters_Movie' });
Character.belongsToMany(Movies, { through: 'Characters_Movie' });