const User=require('../database/model/User');
const jwt=require('jsonwebtoken');
const bcrypt= require('bcryptjs');
const {promisify} = require('util')
const sgMail= require('@sendgrid/mail');
const dotenv = require('dotenv');
const { NUMBER } = require('sequelize/dist');
dotenv.config({path: './env/.env'})
sgMail.setApiKey(process.env.API_KEY);
const JWT_SECRET=process.env.JWT_SECRET;
const JWT_TIEMPO_EXPIRES=process.env.JWT_TIEMPO_EXPIRES;
const AUTH_ROUNDS=process.env.AUTH_ROUNDS;
const EMAIL=process.env.EMAIL;

exports.getUser=async (req,res)=>{
    try{
        const {user, pass}=req.body;
        await User.findOne({
            where:{
                user:user,
            },
        }).then((user)=>{
            if(!user){
                res.status(404).json({msg:"User not exists "})
            } else{
                console.log("estoy aca")
                if(bcrypt.compareSync(pass,user.pass)){
                    let token = jwt.sign({ user: user }, JWT_SECRET, {
                        expiresIn: JWT_TIEMPO_EXPIRES,
                      });
                      res.json({
                        user: user,
                        token: token,
                      });
                }else {
                    res.status(401).json({msg: "Incorrect password"})
                }
            }
        });
    } catch(error){
        res.json({
            message:"error to display data"+ error,
        });
    }
};

//addUser

exports.createUser= async(req,res,next)=>{
    let password=bcrypt.hashSync(
        req.body.pass,
        Number.parseInt(AUTH_ROUNDS)
        );
        const user2=req.body.user;
        
        try{
            const userExists= await User.findOne({ where:{ user:req.body.user}});
            if(userExists!==null){
                
                res.json("user alredy exists")
            }else {
            
            let addUser= await User.create({
                user:req.body.user,
                pass:password,
                email:req.body.email
            }).then((user)=>{
                const message={
                to:req.body.email,
                from:EMAIL,
                subject:"Welcome to our plataform",
                html:"<h1>Welcome "+user2+ " we love having you as a user</h1>"

                }; 
            try{
                // sgMail.send(message);
                console.log("enviado");
            }catch(error){
                console.log("no ENviado")
                return res.status(error.code).send(error.message);
            }
            res.status(201).send({success:true});
            });  
        }       
        }catch (error){
            console.log(error);
            res.status(404).json({
                message:"error saving date"+ error,
                data:{},
            })
        }
}
exports.isAuthenticated = async (req, res, next)=>{
    
    
        
    
        if(!req.headers.authorization){
        res.status(401).json("Is user not logged");
    }else{
        let token=req.headers.authorization.split(" ")[1];
        jwt.verify(token, JWT_SECRET, (err, decoded) => {

            if(err) {
                res.status(500).json({ msg: "There was a problem decoding the token", err });
            } else {
                req.user = decoded;
                
                next();
            }

        })
    }
   
}


