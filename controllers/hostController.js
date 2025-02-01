const Home = require("../models/home");

exports.getAddHome = (req, res, next) => {
  res.render("host/add-home", { pageTitle: "Add-Home", currentPage: "Add Home",
  editing:false,
 });
};

exports.postAddHome = (req, res, next) => {
  console.log("Home registration successful for:", req.body);

  const { houseName, price, location, rating, photoUrl,description} = req.body;

  const home = new Home(houseName, price, location, rating, photoUrl,description);
  home.save().then(()=>{
    console.log("Home saved successfully");
    
    res.redirect("/host/host-home-list");  
  })
  .catch(err => {
    console.error("Error saving home:", err);
    res.redirect("/host/add-home");  
  });
};

exports.gethosthomelist=(req, res, next) => {
  Home.fetchAll().then(registeredHomes=>{

    res.render("host/host-home-list", {
      registeredHomes: registeredHomes,
      pageTitle: "Host home List",
      currentPage: "host-home-list",
    });
  })
}

exports.gethostedithomelist=(req, res, next) => {
  const homeid=req.params.homeid;
  const editing=req.query.editing==='true';
Home.findById(homeid).then(home=>{

if(!home){
  console.log("Home not found for editing");
  return res.redirect("/host/host-home-list")
}
console.log(homeid,editing,home);
    res.render("host/edit-home", {
      home:home,
      pageTitle: "Edit Home List",
      currentPage: "host-home-list",
      editing:editing,
    });
})

  
  
}

exports.postEditHome = (req, res, next) => {
 
  const { id,houseName, price, location, rating, photoUrl,description } = req.body;

  const home = new Home(houseName, price, location, rating, photoUrl,description,id);
   home.save().then(() => {
 
  res.redirect("/host/host-home-list");
})
.catch(err => {
  console.error("Error saving home:", err);
  res.redirect("/host/add-home");
});
};


exports.postDeleteHome = (req, res, next) => {
 
  const homeid=req.params.homeid;
  console.log('came to delete',homeid)
  Home.deleteById(homeid).then(()=>{
    
    res.redirect("/host/host-home-list");
  }).catch(error=>{
    {console.log('Error while deleting',error);
  }

})}
