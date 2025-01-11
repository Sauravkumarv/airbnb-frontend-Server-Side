
//core module
const path=require('path');

// const rootDir=require('../utils/pathUtil')

//External Module
const express=require('express');
const userRouter=express.Router();
const {registeredHomes}=require('./hostRouter');



userRouter.get('/',(req,res,next)=>{

  console.log(registeredHomes);
  // res.sendFile(path.join(rootDir,"views","home.html"))
res.render('home',{registeredHomes:registeredHomes,pageTitle:'airbnb Home',currentPage:'Home'})

})




module.exports=userRouter;