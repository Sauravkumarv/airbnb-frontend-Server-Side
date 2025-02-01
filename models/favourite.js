const { getDB } = require("../utils/database");

module.exports = class Favourite {
  constructor(houseid){
    this.houseid=houseid;
  }

save(){
  const db=getDB();

  return db.collection('favourite').findOne({houseid:this.houseid}).then(existingFav=>{
    if(!existingFav){
      return db.collection('favourite').insertOne(this);
    }
    return  Promise.resolve();
})
 
}

  
  // Get all favourite homes
  static getFavourite() {
   
      const db=getDB();
  return db.collection('favourite').find().toArray();
    }
  

  // Delete a home from favourites by its ID
  static deleteById(delhomeid) {
    const db=getDB();
    return db.collection('favourite')
    .deleteOne({houseid:delhomeid});
  }
};
