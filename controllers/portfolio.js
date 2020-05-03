const Portfolio = require("../models/portfolio");
const formidable = require("formidable");
const _ = require("lodash");
const fs = require("fs");

//for param
exports.getPortfolioById = (req, res, next, id)=>{
    Portfolio.findById(id)
    .exec((err, portfolio)=>{
        if(err){
            return res.status(400).json({
                error: "Portfolio not found"
            })
        }
        req.portfolio = portfolio;
        next();
    })
}

exports.getPortfolio = (req, res)=>{
    req.portfolio.photo = undefined;
    return res.json(req.portfolio);
}

//middleware-This will make our application faster to load 
exports.photo = (req, res, next)=>{
    if(req.portfolio.photo.data){
        res.set("Content-Type", req.portfolio.photo.contentType)
        return res.send(req.portfolio.photo.data)
    }
    next();
}

exports.createPortfolio = (req, res)=>{
    //creating a form
    let form = new formidable.IncomingForm();
    //form should also include the extensions of the files
    form.keepExtensions = true;

    //Now parse the form
    form.parse(req, (err, fields, file)=>{
        if(err){
            return res.status(400).json({
                error: "problem with Image"
            })
        }

        //destructure the fields
        const {title, description} = fields;

        //create a product object and put fields in it which is just a simple data
        let portfolio = new Portfolio(fields);

        //handle file here
        if(file.photo){
            if(file.photo.size > 3000000){
                return res.status(400).json({
                    error: "File size too big"
                })
            }
            //These two lines saves the Photo the the DB
            portfolio.photo.data = fs.readFileSync(file.photo.path);
            portfolio.photo.contentType  = file.photo.type;
        }

        //Now save the product(including photo) to the DB
        portfolio.save((err, portfolio)=>{
            if(err){
                return res.status(400).json({
                    error: "Saving portfolio in DB failed"
                })
            }
            res.json(portfolio);
        })
    })
}

exports.allPortfolios = (req, res)=>{
    Portfolio.find()
    .select("-photo")
    .exec((err, portfolios)=>{
        if(err){
            return res.status(400).json({
                error: "No portfolio found"
            })
        }
        res.json(portfolios);
    })
}

exports.updatePortfolio = (req, res)=>{
     //creating a form
     let form = new formidable.IncomingForm();
     //form should also include the extensions of the files
     form.keepExtensions = true;
 
     //Now parse the form
     form.parse(req, (err, fields, file)=>{
         if(err){
             return res.status(400).json({
                 error: "problem with Image"
             })
         }
 
         //updation of the product
         let portfolio = req.portfolio;
         portfolio = _.extend(portfolio, fields);
 
         //handle file here
         if(file.photo){
             if(file.photo.size > 3000000){
                 return res.status(400).json({
                     error: "File size too big"
                 })
             }
             //These two lines saves the Photo the the DB
             portfolio.photo.data = fs.readFileSync(file.photo.path);
             portfolio.photo.contentType  = file.photo.type;
         }
 
         //Now save the product(including photo) to the DB
         portfolio.save((err, portfolio)=>{
             if(err){
                 return res.status(400).json({
                     error: "Updating portfolio in DB failed"
                 })
             }
             res.json(portfolio);
         })
     })
}

exports.removePortfolio = (req, res)=>{
    let portfolio = req.portfolio;
    portfolio.remove((err, portfolio)=>{
        if(err){
            return res.status(400).json({
                error: "portfolio can't be deleted"
            })
        }
        res.json({
            message: "portfolio Successfully deleted",
            portfolio
        })
    })
}