var express = require("express");
var router = express.Router();
const {signout, signin, isSignedIn, isAuthenticated} = require("../controllers/auth");

router.post("/signin", signin);

router.get("/signout", signout);

module.exports = router;