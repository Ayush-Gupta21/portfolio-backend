var express = require("express");
var router = express.Router();
const {check} = require("express-validator");
const {isSignedIn, isAuthenticated, getUserById} = require("../controllers/auth");
const {getContactById, createContact, allContacts, getContact, removeContact} = require("../controllers/contact");

router.param("userId", getUserById)
router.param("contactId", getContactById)

//create
router.post("/createcontact",
[
    check("name").isLength({min:3}).withMessage("Name should be minimum 3 chars long!"),
    check("email").isEmail().withMessage("Please enter the correct email address!"),
    check("message").isLength({min: 10}).withMessage("Message should be minimum 10 chars long!")
], 
createContact)

//read
router.get("/contacts/:userId",isSignedIn, isAuthenticated, allContacts)
router.get("/contact/:contactId/:userId", isSignedIn, isAuthenticated, getContact)

//delete
router.delete("/contact/:contactId/:userId", isSignedIn, isAuthenticated, removeContact)

module.exports = router;
