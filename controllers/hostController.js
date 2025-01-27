const Home = require("../models/home");

exports.getAddHome = (req, res, next) => {
  res.render("host/add-home", { pageTitle: "Add-Home", currentPage: "Add Home",
  editing:false,
 });
};

exports.postAddHome = (req, res, next) => {
  console.log("Home registration successful for:", req.body);

  const { houseName, price, location, rating, photoUrl } = req.body;

  const home = new Home(houseName, price, location, rating, photoUrl);
  home.save();

  
  res.render("host/home-added", {
    pageTitle: "Home Added Successfully",
    currentPage: "Home Added",
  });
};


exports.gethosthomelist=(req, res, next) => {
  Home.fetchAll((registeredHomes)=>{

    res.render("host/host-home-list", {
      registeredHomes: registeredHomes,
      pageTitle: "Host home List",
      currentPage: "host-home-list",
    });
  })
}

exports.gethostedithomelist=(req, res, next) => {
  const homeId=req.params.homeId;
  const editing=req.query.editing==='true';
Home.findById(homeId, home=>{
if(!home){
  console.log("Home not found for editing");
  return res.redirect("/host/host-home-list")
}
console.log(homeId,editing,home);
    res.render("host/edit-home", {
      home:home,
      pageTitle: "Edit Home List",
      currentPage: "host-home-list",
      editing:editing,
    });
})

  
  
}

exports.postEditHome = (req, res, next) => {
 
  const { id,houseName, price, location, rating, photoUrl } = req.body;

  const home = new Home(houseName, price, location, rating, photoUrl);
  home.id=id;
  home.save();

res.redirect("/host/host-home-list");
}

exports.postDeleteHome = (req, res, next) => {
 
  const homeId=req.params.homeId;
  Home.deleteById(homeId,(error)=>{
    if(error){
      console.log("Error Deleting Home",error)
    }
    res.redirect("/host/host-home-list");
  })

}
