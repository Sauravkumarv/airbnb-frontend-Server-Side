const path=require('path');
const express=require('express');

const userRouter=require("./routes/userRouter")
const {hostRouter}=require("./routes/hostRouter");
const rootDir=require('./utils/pathUtil')

const app=express();

app.set('view engine','ejs');
app.set('views','views');

app.use('/',(req,res,next)=>{
  console.log("server is connected",req.url,req.method)
  next();
});

app.use(express.urlencoded());
app.use(userRouter);
app.use(hostRouter);

//css path
app.use(express.static(path.join(rootDir,"public")))


app.use((req,res,next)=>{
  res.status(404).render('404',{
    pageTitle:'404',currentPage:'404'
  })
})



const port=4010;
app.listen(port,()=>{
  console.log(`Your server is connected to http://localhost:${port}`)
})