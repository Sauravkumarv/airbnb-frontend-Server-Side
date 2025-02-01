const {getDB} = require("../utils/database");
const {ObjectId}=require("mongodb")

module.exports = class Home {
  constructor(houseName, price, location, rating, photoUrl,description,_id) {
    this.houseName = houseName;
    this.price = price;
    this.location = location;
    this.rating = rating;
    this.photoUrl = photoUrl;
    this.description=description;
    if(_id){
      this._id=_id;

    }
  }

  save() {
    const db=getDB();
    if(this._id)
    
    {const updateFileds={
  houseName:this.houseName,
  price:this.price,
  location:this.location ,
  rating:this.rating,
  photoUrl:this.photoUrl ,
  description:this.description,
}
    //update
      return db.collection("homes").updateOne(
        { _id: new ObjectId(String(this._id)) },
        { $set: updateFileds }
      );

    }
    else{
      return db.collection('homes').insertOne(this);

    }
   

  }

 

  static fetchAll() {
    const db=getDB();
return db.collection('homes').find().toArray();
  }

  static findById(homeid) {
    const db=getDB();
    return db.collection('homes').find({_id:new ObjectId(String(homeid))}).next();

  }

static deleteById(homeid){

  const db=getDB();
  return db.collection('homes')
  .deleteOne({_id:new ObjectId(String(homeid))});

}

  
};
