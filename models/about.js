const mongoose = require("mongoose");

var aboutSchema = new mongoose.Schema({
    content: String
},
 { timestamps: true}
);

module.exports = mongoose.model("About", aboutSchema);