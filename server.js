// load .env data into process.env
require("dotenv").config();

// Web server config
const PORT = process.env.PORT || 8080;
const ENV = process.env.ENV || "development";
const express = require("express");
const bodyParser = require("body-parser");
const sass = require("node-sass-middleware");
const app = express();
const morgan = require("morgan");

// PG database client/connection setup
const { Pool } = require("pg");
const dbParams = require("./lib/db.js");
const db = new Pool(dbParams);
db.connect();
//requires helper function and directly calls db
const databaseHelpers = require("./db/database-helper")(db);

// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//         The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
app.use(morgan("dev"));

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  "/styles",
  sass({
    src: __dirname + "/styles",
    dest: __dirname + "/public/styles",
    debug: true,
    outputStyle: "expanded",
  })
);
app.use(express.static("public"));

// Separated Routes for each Resource
// Note: Feel free to replace the example routes below with your own
const usersRoutes = require("./routes/users");
const widgetsRoutes = require("./routes/widgets");

// Mount all resource routes
// Note: Feel free to replace the example routes below with your own
app.use("/api/users", usersRoutes(db));
app.use("/api/widgets", widgetsRoutes(db));
// Note: mount other resources here, using the same pattern above

// Home page
// Warning: avoid creating more routes in this file!
// Separate them into separate routes files (see above).
app.get("/", (req, res) => {
  res.render("index");
});
app.get("/favourites", (req, res) => {
  databaseHelpers.getItems().then((result) => {
    console.log("result: ", result);
    res.render("favourites", { items: result });
  });
});

app.get("/category", (req, res) => {
  databaseHelpers.getItems().then((result) => {
    console.log("result: ", result);
    res.render("category", { items: result });
  });
  //if statements with 3 item page routes. if button 1 clicked res.render first item page etc.
});

app.get("/item_description", (req, res) => {
  databaseHelpers.getItems().then((result) => {
    console.log("result: ", result);
    res.render("item_description", { items: result });
  });
});

app.get("/item_description/:id", (req, res) => {
  //*IMP*req.params.id is assoc with whatevr name is after : in route name
  databaseHelpers.getItem(req.params.id).then((result) => {
    console.log("result: ", result);
    res.render("item_description", { items: result });
  });
});
// /route/:id, req.params.id=assoc with :id in route, res.render to id specific page

app.get("/favourites", (req, res) => {
  databaseHelpers.getFavourites().then((result) => {
    console.log("result: ", result);
    res.render("favourites", { items: result });
  });
});

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
