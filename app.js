const path=require('path');
const express=require('express');

const storeRouter=require("./routes/storeRouter")
const {hostRouter}=require("./routes/hostRouter");
const rootDir=require('./utils/pathUtil')
const errors=require('./controllers/errors')
const {mongoConnect}=require("./utils/database")






const app=express();

app.set('view engine','ejs');
app.set('views','views');

app.use('/',(req,res,next)=>{
  console.log("server is connected",req.url,req.method)
  next();
});

app.use(express.urlencoded());
app.use(storeRouter);
app.use(hostRouter);

//css path
app.use(express.static(path.join(rootDir,"public")))


app.use(errors.pageNotfound)



const port=4010;
mongoConnect(()=>{
  app.listen(port,()=>{
    console.log(`Your server is connected to http://localhost:${port}`)
  })
})