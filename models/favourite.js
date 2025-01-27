const fs=require('fs');
const path=require('path')
const rootDir=require('../utils/pathUtil');
const { error } = require('console');


const favouriteDataPath=path.join(rootDir,"data","favourite.json")

//fake database
// const registeredHomes = [];


module.exports=class Favourite{
  static addToFavourite(id,callback){
    Favourite.getFavourite((favourite) => {
      favourite.push(this);

      if(favourite.includes(id)){
       callback("Home is already marked favourite")
      }else{
        favourite.push(id);
         fs.writeFile(favouriteDataPath, JSON.stringify(favourite),callback) 
        
          }

     
    });
  }
  static getFavourite(callback){
    fs.readFile(favouriteDataPath,(err,data)=>{
      
      callback(!err?JSON.parse(data):[]);
    })
  }

  static deleteById(delHomeId,callback){
    Favourite.getFavourite(homesIds=>{
       homesIds=homesIds.filter(homeId=>delHomeId !==homeId);
      fs.writeFile(favouriteDataPath,JSON.stringify(homesIds),callback)
    })
  }
};