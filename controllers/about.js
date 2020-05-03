const About = require("../models/about");

exports.getAboutById = (req, res, next, id)=>{
    About.findById(id).exec((err, about)=>{
        if(err || !about){
            return res.status(400).json({
                error: "About not found"
            });
        }
        req.about = about;
        next();
    })
}

exports.createAbout = (req, res)=>{

    About.create(req.body,(err, about)=>{
        if(err){
            return res.status(400).json({
                error: "Can't create About"
            })
        }
        res.json({about});
    })
}

exports.getAbout = (req, res)=>{
    return res.json(req.about);
}

// exports.updateAbout = (req, res)=>{
//     console.log(req.about)
//     const about = req.about;
//     about.content = req.body.content;
//     about.save((err, updatedAbout)=>{
//         if(err){
//             return res.status(400).json({
//                 error: "About not found"
//             })
//         }
//         res.json(updatedAbout);
//     })
// }

exports.updateAbout = (req, res)=>{
    console.log(req.body)
    console.log(req.about)
    About.findByIdAndUpdate(
        {_id: req.about._id},
        {$set: req.body},
        {useFindAndModify: false},
        (err, about)=>{
            if(err || !about){
                return res.status(400).json({
                    error: "About not found"
                })
            }
            res.json(about);
        }
    )
}