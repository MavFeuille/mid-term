//terminal end that catches client.js all requests
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
const bcryptjs = require ('bcryptjs');
const cookieSession = require("cookie-session");
app.use(cookieSession({
  name: "session",
  keys: ["eSgVkYp3s6v9y$B&E)H@McQfTjWmZq4t", "z$C&F)J@NcRfUjWnZr4u7x!A%D*G-KaP" ]
}));

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

  // req.session.user_id = req.params.users.id;

  // console.log('++++user undefined check', user)
  // console.log('++++req.params undefined check',req.params)

  // if (!req.sessions.user_id) {
  //   res.render("index");
  // }
  res.render("index");
  // res.redirect (`/`);
});


app.get("/login", (req, res) => {

  const user = users[req.session["userID"]];
  const templateVars = { user, urls: urlDatabase };

  res.render("urls_login", templateVars);
});


app.post("/login", (req, res) => {
  const tmpPassword = bcryptjs.hashSync('123')
//  console.log(">>>>>>>>", tmpPassword)
  const email = req.body.email;
  const password = req.body.password;
  const templateVars = {};

  if (!email || !password) {
   templateVars.error = 'email and password cannot be empty'
   return res.render("index", templateVars);
  }

 databaseHelpers.getUserByEmail(email).then((user) => {
  // console.log(">>>>>>>>>>result: ", user);
  if (!user) {
    console.log("user not found.........")
    templateVars.error = 'No account plz register'
    return res.render("index", templateVars);
  }
  //compares both inputed passwords
  const checkPassword = bcryptjs.compareSync(password, user.password);
  if (!checkPassword){
    // console.log("wrong password .........")
    templateVars.error = 'Wrong password'
    return res.render("index", templateVars)
  }
  req.session.user_id = user.id;
  // console.log("++++++++", req.session.user_id)
  templateVars.user = user;
  res.render("index", templateVars);
  });
});


app.get("/home", (req, res) => {
  res.render("index");
});

app.get("/home/logged_in", (req, res) => {
  res.render("logged_in");
});

app.get("/home/:category", (req, res) => {
  req.session.user_id
  databaseHelpers.getCategory(req.params.category)
    .then((result) => {
      console.log("result: ", result);
      res.render("category", {items: result, user_id:  req.session.user_id });

  })
  //if statements with 3 item page routes. if button 1 clicked res.render first item page etc.
});

app.get("/item_description", (req, res) => {
  //set the default price
  const minP =req.params.minPrice || 0
  const maxP =req.params.maxPrice || 10000000

  //wanna see numbers inputted
  console.log("<<<<<<<<<< minmax req.params price",req.params);
  databaseHelpers.getItemsByPrice(minP, maxP)
  .then((result) => {
    // console.log("result: ", result);
    res.render("item_description", {items: result});

  })
})

app.post("/item_description", (req, res) => {
  //set the default price
  console.log("<<<<<<<<<< minmax req.body price",req.body);
  const minP =req.body.minPrice || 0
  const maxP =req.body.maxPrice || 10000000

  //wanna see numbers inputted

  databaseHelpers.getItemsByPrice(minP, maxP)
  .then((result) => {
    // console.log("result: ", result);
    res.render("item_description", {items: result});

  })
});

app.get("/item_description/:id", (req, res) => {
  //*IMP*req.params.id is assoc with whatevr name is after : in route name
  databaseHelpers.getItem(req.params.id).then((result) => {
    console.log("result: ", result);
    res.render("item_description", { items: result });
  });
});

// GET admin page for admin only
//QUESTION--cant find seller id
app.get("/admin", (req, res) => {
  //*IMP*req.params.id is assoc with whatevr name is after : in route name
  console.log("req.session``````: ", req.session);
  // req.session.user_id = user.id;
  const tmpPassword = bcryptjs.hashSync('123');
  const user_id = req.session.user_id;
  const item_id = req.body.item_id;
  const templateVars = {};
  console.log("---------USER ID: ", user_id)

  if(user_id) {
  console.log(("...User is logged in....."), user_id)
  } else {
    return res.status(401).send("You do not have access to this page");
  }
  databaseHelpers.getUserSeller(user_id).then((result) => {
    console.log("result: ", result);
    res.render("admin", { items: result, user: user_id });
  });
  // res.render("admin", { items: result });
});
// /route/:id, req.params.id=assoc with :id in route, res.render to id specific page

// app.get("/favourites", (req, res) => {
//   databaseHelpers.getItems().then((result) => {
//     console.log("result: ", result);
//     res.render("favourites", { items: result });
//   });
// });

//show a specific users fav page, ex favourites/1
app.get("/favourites/:id", (req, res) => {
  databaseHelpers.getFavourites(req.params.id).then((result) => {
    console.log("<<<<<<<<<<req.params.id:", req.params.id);
    console.log("result: ", result);
    res.render("favourites", { items: result });
  });
});
//make route for /favourites/summary page for each user


//favourites button functionality to add fav item to db w/o re-direct due to UX
app.post("/favourites", (req, res) => {
  const tmpPassword = bcryptjs.hashSync('123')
  // req.session.user_id = user.id;
  // req.session.item_id = items.id;
  const user_id = req.session.user_id
  const item_id = req.body.item_id
  const templateVars = {};
  // console.log('value of the heart++++++req.session',req.session)
  // console.log('.......user_id, item_id',user_id, item_id)
  databaseHelpers.addFavourites(user_id, item_id).then((result) => {
    console.log("result: ", result);
   return res.json({ items: result });
  });
});


app.post("/item/sold", (req, res) => {
  const tmpPassword = bcryptjs.hashSync('123')
  const user_id = req.session.user_id
  const item_id = req.body.item_id
  const templateVars = {};
  if (item_id) {
    console.log("...ITEM exists to be SOLD ..");
  }
  databaseHelpers.itemSold(item_id).then((result) => {
    console.log("result: ", result);
   return res.json({ items: result });
  });
});

//POST DELETE items by seller only
app.post("/item/delete", (req, res) => {

  const tmpPassword = bcryptjs.hashSync('123');
  // const seller_id = req.params.seller_id;
  const user_id = req.session.user_id
  const item_id = req.body.item_id;

  console.log("delete item_id......... :", item_id);
  const templateVars = {};

  if (user_id) {
    console.log("...Seller is here.....");
  }
  databaseHelpers.removeItem(item_id).then((result) => {
    console.log("====== item DELETED =======")
  return res.status(200).json({status: ">>>>> item deleted!!!! <<<<<<"});
  });
  // delete urlDatabase[shortURL];
  // console.log("result: ", result);
  // res.redirect("/urls");
});

//____for mark sold function____
// const buyer_id = req.params.shortURL;
// if (buyer_id) {
  //   return res.status(401).send("Authorization required to delete this short URL.");
  //   //   console.log("userID", userID);
  //   // } else {
    // //   const urlsUser = urlsForUser(userID, urlDatabase);
    // //   console.log("urlsUser: ", urlsUser);
    //   if (urlsUser) {
//     console.log(`Delete shortURL request sent:`, req.params.shortURL);
//     return res.redirect("/urls");
//   // } else {
//   //   return res.status(401).send("You do not have access to this URL");
//   // }
// }



// ____________PORT______________
app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
