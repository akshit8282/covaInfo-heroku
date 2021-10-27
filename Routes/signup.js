const express=require('express');

const router=express.Router();
const User=require('../Models/User');
const mongoose = require('mongoose');
router.post('/',(req,res,next)=>{
   User.find({email:req.body.email}).exec().then(
       user=>{
if(user.length>1){
    return res.status(400).json({message:'user already existed'});
}else{
    //hash password
    
        
        //generate user
    
        const user=new User({
            _id:new mongoose.Types.ObjectId,
            firstName:req.body.firstName,
            lastName:req.body.lastName,
            email:req.body.email,
            password:req.body.password,

        });
        user.save().then(user=>{
            return res.status(400).json({message:"user Created"});
        }).catch(err=>{res.status(509).json({message:err})});
    
       
    
   
    

}
       }
   ).catch(err=>{
       return res.status(509).json({message:err+"hlo"});
   });
    
})
module.exports = router;