//Import jsonwebtoken as jwt
const jwt = require('jsonwebtoken');
//Import Bcrypt
const bcrypt = require('bcrypt');
//Import User Models
const User = require('../Models/UserModel');

//create and export modules
module.exports={
    Register:(req,res)=>{
        const {UserName,Email,Pass}=req.body;
        User.find({Email}).then((results)=>{
            if(results.length>0)
            return res.status(200).json ({msg:'User Allready Registred'});

            bcrypt.hash(Pass,10).then((hashPass)=>{
                User.insertMany({UserName,Email,Pass:hashPass}).then((result)=>{
                    return res.status(200).json({result});
                });
            });
        });
    },

    Login:(req,res)=>{
        const {Email,Pass}=req.body;
        User.find({Email}).then((results)=>{
            if(results==0)
            return res.status(200).json({msg:'Wrong User Or Pass!!!'});

            const hashPass=results[0].Pass;

            bcrypt.compare(Pass,hashPass).then((status)=>{
                if(!status)
                return res.status(200).json({msg:'Wrong User Or Pass!!!'});
            const myUser = results[0];
            const token = jwt.sign({Email,Pass,UserName:myUser.UserName},process.env.PRIVATE_KEY,{expiresIn:'2h'});

            req.session.user=token;

            return res.status(200).json({msg:"Login Seccesfull,WELCOME",token});
            });
        });
    }
}
