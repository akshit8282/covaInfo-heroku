const jwt=require('jsonwebtoken');
const checkAuth=(req,res,next)=>{
    try {


        const token = req.headers.authorization.split(" ")[1];
        
        var decoded = jwt.verify(token, 'secret');
       
req.userData=decoded;

next();
      } catch(err) {
        res.status(400).json({message:err});
      }
}
module.exports=checkAuth;