var jwt                         = require("jsonwebtoken");
var expressJwt                  = require("express-jwt");

exports.getUserById = (req, res,next) =>{
        const email=""
        const user = {
            email: process.env.EMAIL
        }
        req.profile = user;
        next();
}


exports.signin = (req, res)=>{

    let email=""
    let password="" 

    const user = {
        email: req.body.email,
        password:req.body.password
    }

    const authenticate = (password) => {
        if(req.body.password === process.env.PASSWORD  && req.body.email === process.env.EMAIL){
            return true;
        } else{
            return false;
        }
    }

    if(!authenticate(password)){
            return res.status(401).json({
                error: "email and password does not match"
            })
        }

        //create token
        const token = jwt.sign({email: user.email}, process.env.SECRET);
        
        //put token in cookie
        res.cookie("token", token, {expire: new Date() + 9999 });

        //send response to front end
        // const {name, email} = user;
        return res.json({token, user: user.email })
}

exports.signout = (req,res)=>{
    res.clearCookie("token");
    res.json({
        message:"User signout Success!"
    });
};
    
exports.isSignedIn = expressJwt({
    secret: process.env.SECRET,
    userProperty: "auth"
})

//custom middlewares
exports.isAuthenticated = (req, res, next)=>{
    let checker = req.profile && req.auth && req.profile.email == req.auth.email;
    if(!checker){
        return res.status(403).json({
            error: "ACCESS DENIED"
        })
    }
    next();
}