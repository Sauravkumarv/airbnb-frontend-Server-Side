//external Module
const express = require("express");
const storeRouter = express.Router();

//local module
const homesController = require("../controllers/storeController");

storeRouter.get("/", homesController.getIndex);
storeRouter.get("/host/home-list", homesController.getHome);
storeRouter.get("/host/favourite-list", homesController.getFavouriteList);
storeRouter.get("/host/bookings", homesController.getBookings);
storeRouter.get("/host/bookings", homesController.getBookings);
storeRouter.get("/home/:homeId", homesController.getHomesDetails);

storeRouter.post("/host/favourite-list", homesController.postFavourite);

storeRouter.post(
  "/host/remove-favourite/:homeId",
  homesController.postRemoveFavourite
);

module.exports = storeRouter;
