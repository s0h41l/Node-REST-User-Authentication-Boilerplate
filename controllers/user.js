const becrypt=require('bcryptjs');
const jwt=require('jsonwebtoken');

const User=require('../models/user');

exports.signUp=(req,res)=>{
    const name=req.body.name;
    const email=req.body.email;
    const password=req.body.password;
    User.findOne({email:email}).then(usr=>{
        if(usr){
            res.status(409).json({message:'User already exists!'});
        }
        becrypt.hash(password,12).then(hash=>{
            const user=new User({
                name:name,
                email:email,
                password:hash,
                status:'online'
            });
            user.save().then(result=>{
                res.status(200).json({message:"User Created!",userId:result._id});
            });
        }).catch(err=>{
            res.status(500).json({message:"problem"});
        })
        
    })
    .catch(err=>{
        res.status(500).json({message:"problem"});
    })
}

exports.signIn=(req,res,next)=>{
    const email=req.body.email;
    const password=req.body.password;
    let usr;
    User.findOne({email:email}).then(user=>{
        if(!user){
            res.status(401).json({message:'User authentication failed!'});
        }
        usr=user;
        return becrypt.compare(password,user.password);
    })
    .then(isEqual=>{
        if(!isEqual){
            res.status(401).json({message:'User authentication failed!'});
        }
        const token=jwt.sign({
            email:usr.email,
            userId:usr._id.toString()
        },'zeek-key',{expiresIn:'1h'});
        exp = new Date();
        exp = exp.getTime()+60*60*1000;
        res.status(200).json({name: usr.name,email : email, token:token, userId:usr._id.toString(), expiration: exp , message:"User logged in."});
    })
    .catch(err=>{
        res.status(500).json({message:'Error occur'});
    });
}