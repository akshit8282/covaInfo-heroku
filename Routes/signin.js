const mongoose=require('mongoose');
const User=require('../Models/User');
const express=require('express');
const router=express.Router();
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');

router.post('/',(req,res,next)=>{
User.find({email:req.body.email}).exec().
then(user=>{
    if(user.length<1){
       return res.status(400).json({message:'no user'});
    }//it means no user with this email
    else{
        bcrypt.compare(req.body.password,user[0].password,(err,result)=>{
           
            if(err){
               return res.status(400).json({message:'auth failed'});
            }if(result){
               
               //token creation
           var token=jwt.sign({
    data:{
        userId: user[0]._id,
        firstName: user[0].firstName,
        lastName: user[0].lastName,
        email: user[0].email,
    }
  }, 'secret', { expiresIn: '1h' });
return res.status(200).json({
    message:'authenticated',
    token:token
})
            }
           return res.status(400).json({message:'auth failed'});
        })
    }
})
.catch(err=>{ return res.status(400).json({message:err});
})
});

module.exports=router;
