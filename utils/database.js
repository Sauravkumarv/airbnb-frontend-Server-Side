const mongodb=require("mongodb");

const MongoClient=mongodb.MongoClient;

const url = "mongodb+srv://root:tiger@cpmpletecoding.lknz4.mongodb.net/?retryWrites=true&w=majority&appName=cpmpleteCoding";

let _db;
const mongoConnect=(callback)=>{
MongoClient.connect(url).then(client=>{
  console.log("connected to Mongodb");
  callback (client);
  _db=client.db('airbnb');
})
.catch((err)=>{
  console.log("error while connecting",err);
})
}

const getDB=()=>{
  if(!_db){
    throw new Error('Mongo Not connected')
  }
  return _db;
}

exports.mongoConnect=mongoConnect;
exports.getDB=getDB;