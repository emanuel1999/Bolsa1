const {Model, DataTypes}=require('sequelize');
const sequelize=require('../db');
const Movies = require('./Movie');
class Character extends Model{};
Character.init({
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
    },
    age:{
        type:DataTypes.INTEGER,
        allowNull:false,
        validate:{
            notNull:{
                msg:"age cannot be null"
            },
            isInt:{
                args:true,
                msg:"The age can only have numbers integer"
            }
        }
     },
    weight:{
        type:DataTypes.INTEGER,
        allowNull:false,
        validate:{
            notNull:{
                msg:"weight cannot be null"
            },
            isNumeric:{
                args:true,
                msg:"The weight can only have numbers"
            }
        }
     },
    history:{
        type:DataTypes.STRING,
        allowNull:false,
        validate:{
            notNull:{
                msg:"history cannot be null"
            }
        }    
    }
    

},{
    timestamps:false,
    sequelize,
    modelName:"character"
})

module.exports=Character;