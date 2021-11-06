const express=require('express');
const VideoDetails=require('../Models/VideoDetail');
const router=express.Router();



router.get('/', (req, res, next) => {

  
  if(!req.headers.id){
    VideoDetails
    .find()
    .exec()
    .then(docs => {
      res.status(200).json(docs);
    })
    .catch(err => {
      res.status(500).json({
        error: err
      });
    });
  }else{
  VideoDetails
    .find({uploader_name:req.headers.id})
    .exec()
    .then(docs => {
      
      res.status(200).json(docs);
    })
    .catch(err => {
      res.status(500).json({
        error: err
      });
    });
  }
});
router.delete('/deleteVideo/:id',async (req,res)=>{
  console.log(req.params.id)
  try{
    const video=await VideoDetails.findById(req.params.id);
    
   console.log(video);
        
video.delete();
res.status(200).json("deleted");
        }catch(err){
            res.status(400).json(err);
        }
    

})

module.exports = router;
/*router.get('/:id',(req,res,next)=>{
    console.log(req.params.video_path);
    videoDetails.find({id:req.params.video_path},(err,result)=>{
        if(err){
            return  res.status(400).json({message:err});

        }
        if(res){
           return  res.status(400).json({result:result});
        }
    })
})*/
