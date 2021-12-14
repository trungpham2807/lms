const express = require('express')
const cors = require('cors')
const morgan = require('morgan');
const cookieParser = require('cookie-parser')
const jsonwebtoken = require("jsonwebtoken");
const bodyParser = require('body-parser')
require('dotenv').config()
// const csrf = require('csurf')
// create express app
const app = express();

// mongodb
const mongoose = require('mongoose');
mongoose.connect(
    process.env.MONGO_URL,
    // "mongodb://localhost:27017/finally",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
    (err) => {
      if (!err) {
        console.log("MongoDB Connection Succeeded.");
      } else {
        console.log("Error in DB connection: " + err);
      }
    }
  );

// middleware

app.use(cors());
// can take any json object (send data from front -> back)
// set limit to prevent payload too large
app.use(express.json({limit : "5mb"}));
app.use(cookieParser());
app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


// route
const indexRouter = require("./routes/index")
app.use("/api", indexRouter);

// port

app.listen(process.env.PORT || 8000, ()=>{
    console.log(`backend server is running`);
})