var express = require("express");
var exphbs = require("express-handlebars");
var bodyParser = require("body-parser");

var app = express();

var PORT = process.env.PORT || 8080;

// Use the express.static middleware to serve static content for the app from the "public" directory in the application directory.
app.use(express.static("public"));

// Parse request body as JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

var routes = require("./controllers/burgers_controller");

app.use(routes);

app.listen(PORT, function(){
    console.log("Listening on port: ", PORT)
})