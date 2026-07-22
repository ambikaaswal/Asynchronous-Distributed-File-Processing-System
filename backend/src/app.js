const express = require("express");
// const logger = require("./middlewares/multer.middleware");
const uploadRoutes = require("./routes/upload.route")
const errorHandler = require("./middlewares/err.middleware");

//app is an object of express function and intializes as an empty object
//and after this can use .get, .post etc of express
//calling express() which returns a request handler function
const app = express();

//If the incoming request body is JSON, parse it and put it inside req.body
app.use(express.json());

//middleware
// app.use(logger);

//will make login and authentication later
// app.use(login);
app.use('/', uploadRoutes);


app.use('/', errorHandler);
module.exports = app;