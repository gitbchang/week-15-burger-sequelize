// *********************************************************************************
// Server.js - This file is the initial starting point for the Node/Express server.
// *********************************************************************************

// Dependencies
// =============================================================
var express = require("express");
var bodyParser = require("body-parser");
// Requiring the **FOLDER**
// sequelize automatically looks for index.js file to create models
var db = require("./models");


// Sets up the Express App
// =============================================================
var app = express();
var PORT = process.env.PORT || 8080;

// Serve static content for the app from the "public" directory in the application directory.
app.use(express.static(process.cwd() + "/public"));

// Sets up the Express app to handle data parsing
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));
// app.use(bodyParser.text());
// app.use(bodyParser.json({
//   type: "application/vnd.api+json"
// }));
// Set Handlebars.
var exphbs = require("express-handlebars");

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");


// Static directory
app.use(express.static("app/public"));


// Routes
// =============================================================

// commenting out the below example route and using a single controller file instead
// require("./routes/api-routes.js")(app);
// require("./routes/html-routes.js")(app);

var routes = require("./controllers/burgerController.js");

app.use("/", routes);



// Starts the server to begin listening
// =============================================================
db.sequelize.sync({force: true}).then(function () {
  app.listen(PORT, function () {
    console.log("App listening on PORT " + PORT);
  });

});