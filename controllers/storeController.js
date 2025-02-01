const Favourite = require('../models/favourite');
const Home=require('../models/home')


exports.getIndex = (req, res, next) => {
  Home.fetchAll()
  .then(registeredHomes=>{
    res.render("store/Index", {
      registeredHomes: registeredHomes,
      pageTitle: "airbnb Home",
      currentPage: "Index",
    });
  });
  };
  


exports.getHome = (req, res, next) => {
  Home.fetchAll()
  .then(registeredHomes=>{
    res.render("store/home-list", {
      registeredHomes: registeredHomes,
      pageTitle: "Homes List",
      currentPage: "home-list",
    });
  });
  
};

exports.getFavouriteList = (req, res, next) => {
  Favourite.getFavourite().then(favourite=>
    {
   favourite=favourite.map(fav=>fav.
    houseid
   )
    Home.fetchAll().then(registeredHomes=>{
      console.log("Favourite",favourite,registeredHomes);
    const favouriteHomes=registeredHomes.
    filter((home)=>
      favourite.includes(home._id.toString()));
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
  const homeid=req.body.id;
  const fav=new Favourite(homeid);

  fav.save().then(result=>{
console.log('fav added:',result);
  }).catch(err=>{
    console.log("Error While Marking Favourite",err);
  })
  .finally(()=>{
    res.redirect("/host/favourite-list");

  })
}



  exports.getHomesDetails = (req, res, next) => {
    const homeid=req.params.homeid;
    console.log("At home Details page",homeid)
    Home.findById(homeid).then(home=>{
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
 
    const homeid=req.params.homeid;
    Favourite.deleteById(homeid).then(result=>{
      console.log('fav removed:',result)
    }).catch(err=>{
      console.log("error while removing favourite:",err)
    }).finally(()=>{
      res.redirect("/host/favourite-list");
    })
    }
   
  
  