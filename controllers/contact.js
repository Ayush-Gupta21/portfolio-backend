const Contact = require("../models/contact");
const {validationResult} = require("express-validator")

exports.getContactById = (req, res, next, id)=>{
    Contact.findById(id).exec((err, contact)=>{
        if(err || !contact){
            return res.status(400).json({
                error: "contact not found"
            });
        }
        req.contact = contact;
        next();
    })
}

exports.createContact = (req, res)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(422).json({
            error: errors.array()[0].msg,
        });
    }
    Contact.create(req.body,(err, contact)=>{
        if(err){
            return res.status(400).json({
                error: "An Error Occured"
            })
        }
        res.json(contact);
    })
}

exports.getContact = (req, res)=>{
    return res.json(req.contact);
}

exports.allContacts = (req, res)=>{
    Contact.find().exec((err, contact)=>{
        if(err){
            return res.status(400).json({
                error: "No contact found"
            })
        }
        res.json(contact)
    })
}

exports.removeContact = (req, res)=>{
    Contact.findByIdAndRemove(
        {_id: req.contact._id},
        {useFindAndModify:false},
        (err)=>{
            if(err){
                return res.json({
                    error: "contact can't be deleted"
                })
            }
             res.json({
                 message: "Successfully deleted"
             })
        }
    )
}