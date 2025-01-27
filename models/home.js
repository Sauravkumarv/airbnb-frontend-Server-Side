const fs = require("fs");
const path = require("path");
const rootDir = require("../utils/pathUtil");
const Favourite = require("./favourite");
const homePath = path.join(rootDir, "data", "homes.json");

//fake database
// const registeredHomes = [];

module.exports = class Home {
  constructor(houseName, price, location, rating, photoUrl) {
    this.houseName = houseName;
    this.price = price;
    this.location = location;
    this.rating = rating;
    this.photoUrl = photoUrl;
  }

  save() {
    Home.fetchAll((registeredHomes) => {
      console.log(registeredHomes, this);
      if (this.id) {
        //edit home case
        registeredHomes = registeredHomes.map((home) => {
          console.log(home.id, this.id);
          if (home.id === this.id) {
            return this;
          }
          return home;
        });
      } else {
        //add home case
        console.log("New Home");
        this.id = Math.random().toString();

        registeredHomes.push(this);
      }

      fs.writeFile(homePath, JSON.stringify(registeredHomes), (error) => {
        console.log("file writing concluded", error);
      });
    });
  }

  static fetchAll(callback) {
    fs.readFile(homePath, (err, data) => {
      callback(!err ? JSON.parse(data) : []);
    });
  }

  static findById(homeId, callback) {
    this.fetchAll((homes) => {
      const homesFound = homes.find((home) => home.id === homeId);

      callback(homesFound);
    });
  }

static deleteById(homeId,callback){
  this.fetchAll(homes=>{
     homes=homes.filter(home=>home.id !==homeId);
    fs.writeFile(homePath,JSON.stringify(homes),error=>{
      Favourite.deleteById(homeId,callback);
    })
  })
}

  
};
