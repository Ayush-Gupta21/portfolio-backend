var express = require("express");
var router = express.Router();
const {isSignedIn, isAuthenticated, getUserById} = require("../controllers/auth");
const {getPortfolioById, createPortfolio, allPortfolios, getPortfolio, updatePortfolio, removePortfolio, photo} = require("../controllers/portfolio");


router.param("portfolioId", getPortfolioById)
router.param("userId", getUserById)

//create
router.post("/create/portfolio/:userId", isSignedIn, isAuthenticated, createPortfolio)

//read
router.get("/portfolios", allPortfolios)
router.get("/portfolio/:portfolioId", getPortfolio)

//update
router.put("/portfolio/:portfolioId/:userId", isSignedIn, isAuthenticated, updatePortfolio)

//delete
router.delete("/portfolio/:portfolioId/:userId", isSignedIn, isAuthenticated, removePortfolio)

//photo
router.get("/portfolio/photo/:portfolioId", photo);


module.exports = router;