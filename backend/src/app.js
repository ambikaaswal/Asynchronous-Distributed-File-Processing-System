const express = require("express");
const logger = require("./middlewares/upload.middleware");
const uploadRoutes = require("./routes/upload.route")


//app is an object of express function and intializes as an empty object
//and after this can use .get, .post etc of express
//calling expres() which returns a request handler function
const app = express();

//middleware
// app.use(logger);

//will make login and authentication later
app.use(login);
app.use('/', uploadRoutes);



module.exports = app;