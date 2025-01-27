const Favourite = require('../models/favourite');
const Home=require('../models/home')


exports.getIndex = (req, res, next) => {
  Home.fetchAll((registeredHomes)=>{
    res.render("store/Index", {
      registeredHomes: registeredHomes,
      pageTitle: "airbnb Home",
      currentPage: "Index",
    });
  });
  
};


exports.getHome = (req, res, next) => {
  Home.fetchAll((registeredHomes)=>{
    res.render("store/home-list", {
      registeredHomes: registeredHomes,
      pageTitle: "Homes List",
      currentPage: "home-list",
    });
  });
  
};

exports.getFavouriteList = (req, res, next) => {
  Favourite.getFavourite(favourite=>{
    Home.fetchAll((registeredHomes)=>{
    const favouriteHomes=registeredHomes.filter(home=>
      favourite.includes(home.id));
      res.render("store/favourite-list", {
        favouriteHomes: favouriteHomes,
        pageTitle: "My favourites",
        currentPage: "favourite-list",
      });
    })

    
    })
 
}
  exports.getBookings = (req, res, next) => {
    res.render("store/bookings", {
      pageTitle: "My Booking",
      currentPage: "bookings",
    });
  };


//post favourite
exports.postFavourite = (req, res, next) => {
console.log("came to add favorite",req.body);
Favourite.addToFavourite(req.body.id,error=>{
  if(error){
    console.log("Error While Marking Favourite",error);
  }
})
  res.redirect("/host/favourite-list");
};



  exports.getHomesDetails = (req, res, next) => {
    const homeId=req.params.homeId;
    console.log("At home Details page",homeId)
    Home.findById(homeId,home=>{
      if(!home){
        console.log("home Not Found");
        res.redirect("/")
      }else{

     
      res.render("store/home-details",{
      
        home:"home",
        pageTitle:"Home Details",
        currentPage:"Home"
      })
    }
    })
    
  };
  exports.postRemoveFavourite = (req, res, next) => {
 
    const homeId=req.params.homeId;
    Favourite.deleteById(homeId,error=>{
      if(error){
      console.log("Error while removing from favourite",error)
      }
      res.redirect("/host/favourite-list")
    })
    }
   
  
  