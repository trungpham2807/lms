const express = require('express')
const cors = require('cors')
const morgan = require('morgan');
const cookieParser = require('cookie-parser')
require('dotenv').config()

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
app.use(express.json({limit : "3mb"}));
app.use(cookieParser());
app.use(morgan("dev"));
app.use((req,res,next)=> {
  console.log("this is middleware");
  next();
})

// route
const indexRouter = require("./routes/index")
app.use("/api", indexRouter);


// port

app.listen(process.env.PORT || 8000, ()=>{
    console.log(`backend server is running`);
})