const {Model, DataTypes}=require('sequelize');
const sequelize=require('../db');
const Character = require('./Character');

class Movies extends Model{};
Movies.init({
    image:DataTypes.STRING,
    title:{
        type:DataTypes.STRING,
        allowNull:false,
        validate:{
            notNull:{
                msg:"title cannot be null"
            },
            isAlphanumeric:{
                args:true,
                msg:"The title can only have letters and numbers"
            }
        }
     },
    qualification:{
        type:DataTypes.INTEGER,
        allowNull:false,
        validate:{
            notNull:{
                msg:"qualification cannot be null"
            },
            isNumeric:{
                args:true
            },
            min:{
                args:1,
                 msg:"Only numbers from 1 to 5"
            },
            max:{
                args:5,
                msg:"Only numbers from 1 to 5"

            },
        },
            
    },
    gender_id:{

        type:DataTypes.INTEGER,
        allowNull:false,
        validate:{
            notNull:{
                msg:"gender_id cannot be null"
            },
            isNumeric:{
                args:true
            }
        }
    },
    createdAt: {
        type: 'TIMESTAMP',
        allowNull: false
      },
    
    
    
},{

    sequelize,
    modelName:"movies"
})



module.exports=Movies;