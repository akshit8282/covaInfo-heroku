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