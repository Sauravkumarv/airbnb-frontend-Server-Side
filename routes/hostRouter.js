const path = require("path");

const express = require("express");
const hostRouter = express.Router();
const rootDir = require("../utils/pathUtil");

const addHome = require("../controllers/hostController");

hostRouter.get("/host/add-home", addHome.getAddHome);


hostRouter.post("/host/add-home", addHome.postAddHome);

hostRouter.get("/host/host-home-list",addHome.gethosthomelist);
hostRouter.get("/host/edit-home/:homeid",
addHome.gethostedithomelist);
hostRouter.post("/host/edit-home",addHome.postEditHome);
hostRouter.post("/host/delete-home/:homeid",addHome.postDeleteHome);



exports.hostRouter = hostRouter;
