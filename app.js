require("dotenv").config()
const express = require("express")
const app     = express()
const port    = process.env.PORT || 8000
const bodyParser = require("body-parser")
const cookieParser = require("cookie-parser")
const cors = require("cors")
const mongoose = require("mongoose")

//Routes
const authRoutes = require("./routes/auth");
const portfolioRoutes = require("./routes/portfolio");
const contactRoutes = require("./routes/contact");
const aboutRoutes = require("./routes/about");


//"mongodb://localhost:27017/portfolio"

mongoose.connect(process.env.DATABASE ,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
}).then(()=>{
    console.log("MONGODB CONNECTED");
});

app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());

app.use("/api", authRoutes)
app.use("/api", portfolioRoutes)
app.use("/api", contactRoutes)
app.use("/api", aboutRoutes)




app.listen(port, () => console.log("APP LISTENING AT PORT 8000"))