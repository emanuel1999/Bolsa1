const {Model, DataTypes}=require('sequelize');
const sequelize=require('../db');

class Gender extends Model{};
Gender.init({
    image:DataTypes.STRING,
        name:{
         type:DataTypes.STRING,
         allowNull:false,
         validate:{
               notNull:{
                msg:"name cannot be null"
            },
            isAlpha:{
                args:true,
                msg:"The name can only have letters"
            }
       }
    }
},    
{ 
    timestamps:false,
    sequelize,
    modelName:"gender"
})
module.exports=Gender;