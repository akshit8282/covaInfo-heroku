const express=require('express');
const app=express();
const morgan=require('morgan');
const mongoose=require('mongoose');
const bodyparser=require('body-parser');
const cors=require('cors');
const checkAuth=require('./middleware/checkAuth');
const path=require('path');

app.use(cors());
//bodyparser

app.use(express.urlencoded({limit: '50mb',extended:false}));
app.use(express.json({limit: '50mb'}));

app.use('/api/videos/',express.static('uploads'))


//setting mongoose
mongoose.connect("mongodb+srv://akshit:batra@cluster0.anjms.mongodb.net/CovaInfoHeroku?retryWrites=true&w=majority", {
  useNewUrlParser: "true",
  useUnifiedTopology: 'true',
  useCreateIndex: 'true'
});
mongoose.Promise=global.Promise;
mongoose.connection.on("error", err => {
    console.log("err", err)
  })
  mongoose.connection.on("connected", (err, res) => {
    console.log("mongoose is connected")
  })

 
 
app.use('/api/signup',require('./Routes/signup'));
app.use('/api/signin',require('./Routes/signin'));
app.use('/api/upload',checkAuth,require('./Routes/upload'));
console.log(__dirname);
//app.use('/api/videos',require('./Routes/video'));
app.use('/api/videoList',require('./Routes/videoList'));
app.listen(3000,()=>{
    console.log('app is running on 3000');
})