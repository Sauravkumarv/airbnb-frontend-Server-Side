const path=require('path');

const express=require('express');
const hostRouter=express.Router();
const rootDir=require('../utils/pathUtil')




hostRouter.get('/host/add-home',(req,res,next)=>{
  res.render('add-home',{pageTitle:'Add-Home',currentPage:'Add Home'});
})

const registeredHomes=[];

hostRouter.post('/host/add-home',(req,res,next)=>{
  console.log("Home registration successful for:",req.body);
  registeredHomes.push(req.body);
  res.render('home-added',{
    pageTitle:'Home Added Successfully',currentPage:'Home Added'
  })
})





exports.hostRouter=hostRouter;
exports.registeredHomes=registeredHomes;
