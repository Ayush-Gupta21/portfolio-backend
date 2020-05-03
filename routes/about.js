const express = require("express");
const router = express.Router();
const {createAbout, updateAbout, getAbout, getAboutById} = require("../controllers/about");
const { isAuthenticated, isSignedIn} = require("../controllers/auth");
const {getUserById} = require("../controllers/auth");

//params
router.param("userId", getUserById);
router.param("aboutId", getAboutById);

//create
router.post("/about/create/:userId", isSignedIn, isAuthenticated, createAbout);

//read 
router.get("/about/:aboutId", getAbout);

//update
router.put("/about/:aboutId/:userId", isSignedIn, isAuthenticated, updateAbout);



module.exports = router;