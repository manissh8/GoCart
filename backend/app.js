const express = require("express");
const app=express();
const cookieParser = require("cookie-parser");
const errorMiddleware = require("./middleware/error");
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");
const path = require("path");
const dotenv = require("dotenv");


//config
dotenv.config({path:"backend/config/config.env"});

  

app.use(express.json({
    limit: '50mb'
  }));
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(fileUpload());

//Route Imports
const product = require("./routes/productRoute");
const user = require("./routes/userRoute");
const order = require("./routes/orderRoute");
const payment = require("./routes/paymentRoute");


app.use("/api/v1",product);
app.use("/api/v1",user);
app.use("/api/v1",order);
app.use("/api/v1",payment);


//ab koi bhi url ho ab ek hi server chalne wala hai backend ka PORT:4000 pe
app.use(express.static(path.join(__dirname, "../frontend/build")));

//koi bhi url ho bs iske andar wala file return hoga and react does the same thing
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../frontend/build/index.html"));
});

//Middleware for Errors
app.use(errorMiddleware);

module.exports =app;
