const {Model, DataTypes}=require('sequelize');
const sequelize=require('./db');
const Character = require('../database/model/Character');
const Gender = require('../database/model/Gender');
const Movies = require('../database/model/Movie');

Gender.hasMany(Movies);
Movies.belongsTo(Gender);

Movies.belongsToMany(Character, { through: 'Characters_Movies' });
Character.belongsToMany(Movies, { through: 'Characters_Movies' });