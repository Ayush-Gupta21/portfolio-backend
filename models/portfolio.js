const mongoose = require("mongoose");

var portfolioSchema = new mongoose.Schema({
    photo:{
        data: Buffer,
        contentType: String
    },
    title: String,
    description: String,
    github: String,
    site: String
},
 { timestamps: true}
);

module.exports = mongoose.model("Portfolio", portfolioSchema);