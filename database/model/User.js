const {Model, DataTypes}=require('sequelize');
const sequelize=require('../db');

class User extends Model{};
User.init({
    
    user:DataTypes.STRING,
    pass:{
        type:DataTypes.STRING,
        allowNull:false,
        validate:{
            notNull:{
                msg:"pass cannot be null"
            },
        }
    },
    email:{
        type:DataTypes.STRING,
        allowNull:false,
        unique:true,
        validate:{
            notNull:{
                msg:"email cannot be null"
            },
            isEmail:{
                args:true,
                msg:"email: it has to be an email format"
            },
            
        }
    },
    

},{
    timestamps:false,
    sequelize,
    modelName:"user"
})
module.exports=User;