// load .env data into process.env
require ('dotenv').config ();

// ____________________Web server config_______________________________
const PORT = process.env.PORT || 8080;
const ENV = process.env.ENV || 'development';
const express = require ('express');
const bodyParser = require ('body-parser');
const sass = require ('node-sass-middleware');
const app = express ();
const morgan = require ('morgan');
const bcryptjs = require ('bcryptjs');
const cookieSession = require ('cookie-session');
app.use (
  cookieSession ({
    name: 'session',
    keys: [
      'eSgVkYp3s6v9y$B&E)H@McQfTjWmZq4t',
      'z$C&F)J@NcRfUjWnZr4u7x!A%D*G-KaP',
    ],
  })
);

// ________________PG database client/connection setup_________________
const {Pool} = require ('pg');
const dbParams = require ('./lib/db.js');
const db = new Pool (dbParams);
db.connect ();
//requires helper function and directly calls db
const databaseHelpers = require ('./db/database-helper') (db);

// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//         The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
app.use (morgan ('dev'));

app.set ('view engine', 'ejs');
app.use (bodyParser.urlencoded ({extended: true}));
app.use (
  '/styles',
  sass ({
    src: __dirname + '/styles',
    dest: __dirname + '/public/styles',
    debug: true,
    outputStyle: 'expanded',
  })
);
app.use (express.static ('public'));

// Separated Routes for each Resource
// Note: Feel free to replace the example routes below with your own
const usersRoutes = require ('./routes/users');
const widgetsRoutes = require ('./routes/widgets');

// Mount all resource routes
// Note: Feel free to replace the example routes below with your own
app.use ('/api/users', usersRoutes (db));
app.use ('/api/widgets', widgetsRoutes (db));
// Note: mount other resources here, using the same pattern above

// Home page
// Warning: avoid creating more routes in this file!
// Separate them into separate routes files (see above).


// ________ALL * GET * REQUESTS START HERE_____________________________

app.get ('/', (req, res) => {
  res.render ('index');
});

app.get ('/_header', (req, res) => {
  const user = req.session;
  res.render ('/home', {user});
});

app.get ('/home', (req, res) => {
  res.render ('index');
});

app.get ('/home/logged_in', (req, res) => {
  res.render ('logged_in');
});

app.get ('/home/:category', (req, res) => {
  req.session.user_id;
  databaseHelpers.getCategory (req.params.category).then (result => {
    console.log ('result: ', result);
    res.render ('category', {items: result, user_id: req.session.user_id});
  });
});

app.get ('/item_description', (req, res) => {
  //sets the default price
  const minP = req.params.minPrice || 0;
  const maxP = req.params.maxPrice || 10000000;
  console.log ('<<<<<<<<<< minmax req.params price', req.params);
  databaseHelpers.getItemsByPrice (minP, maxP).then (result => {
    res.render ('item_description', {items: result});
  });
});

app.get ('/item_description/:id', (req, res) => {
  //*IMP*req.params.id is assoc with whatevr name is after : in route name
  databaseHelpers.getItem (req.params.id).then (result => {
    console.log ('result: ', result);
    res.render ('item_description', {items: result});
  });
});

app.get ('/admin', (req, res) => {
  //*IMP*req.params.id is assoc with whatevr name is after : in route name
  console.log ('req.session``````: ', req.session);
  const tmpPassword = bcryptjs.hashSync ('123');
  const user_id = req.session.user_id;
  const item_id = req.body.item_id;
  const templateVars = {};
  console.log ('---------USER ID: ', user_id);

  if (user_id) {
    console.log ('...User is logged in.....', user_id);
  } else {
    return res.status (401).send ('You do not have access to this page');
  }
  databaseHelpers.getUserSeller (user_id).then (result => {
    console.log ('result: ', result);
    res.render ('admin', {items: result, user: user_id});
  });
  // res.render("admin", { items: result });
});

//show a specific users fav page, ex favourites/1
app.get ('/favourites/:id', (req, res) => {
  databaseHelpers.getFavourites (req.params.id).then (result => {
    console.log ('<<<<<<<<<<req.params.id:', req.params.id);
    console.log ('result: ', result);
    res.render ('favourites', {items: result});
  });
});

app.get ('/new_item', (req, res) => {
  res.render ('new_item');
});


// __________ALL * POST * REQUESTS START HERE__________________________

app.post ('/item_description', (req, res) => {
  console.log ('<<<<<<<<<< minmax req.body price', req.body);
  const minP = req.body.minPrice || 0;
  const maxP = req.body.maxPrice || 10000000;
  databaseHelpers.getItemsByPrice (minP, maxP).then (result => {
    res.render ('item_description', {items: result});
  });
});

//favourites button functionality to add fav item to db w/o re-direct due to UX
app.post ('/favourites', (req, res) => {
  const tmpPassword = bcryptjs.hashSync ('123');
  const user_id = req.session.user_id;
  const item_id = req.body.item_id;
  const templateVars = {};
  console.log ('.......user_id, item_id', user_id, item_id);
  databaseHelpers.addFavourites (user_id, item_id).then (result => {
    console.log ('result: ', result);
    return res.json ({items: result});
  });
});

app.post ('/item/sold', (req, res) => {
  const tmpPassword = bcryptjs.hashSync ('123');
  const user_id = req.session.user_id;
  const item_id = req.body.item_id;
  const templateVars = {};
  if (item_id) {
    console.log ('...ITEM exists to be SOLD ..');
  }
  databaseHelpers.itemSold (item_id).then (result => {
    console.log ('result: ', result);
    return res.json ({items: result});
  });
});

//POST DELETE items by seller only
app.post ('/item/delete', (req, res) => {
  const tmpPassword = bcryptjs.hashSync ('123');
  const user_id = req.session.user_id;
  const item_id = req.body.item_id;

  console.log ('delete item_id......... :', item_id);
  const templateVars = {};

  if (user_id) {
    console.log ('...Seller is here.....');
  }
  databaseHelpers.removeItem (item_id).then (result => {
    console.log ('====== item DELETED =======');
    return res.status (200).json ({status: '>>>>> item deleted!!!! <<<<<<'});
  });
});

app.post ('/new_item', (req, res) => {
  const tmpPassword = bcryptjs.hashSync ('123');
  // const seller_id = req.params.seller_id;
  const user_id = req.session.user_id;
  const item = req.body;
  const newItem = user_id && item;

  console.log ();

  console.log ('++++++++', req.body);
  databaseHelpers.postItem (newItem).then (result => {
    console.log ('========item_id:', user_id);
    console.log ('result: ', result);
    res.render ('new_item', {items: result});
  });
  res.redirect ('/admin');
});

app.post ('/login', (req, res) => {
  const tmpPassword = bcryptjs.hashSync ('123');
  const email = req.body.email;
  const password = req.body.password;
  const templateVars = {};

  if (!email || !password) {
    templateVars.error = 'email and password cannot be empty';
    return res.render ('index', templateVars);
  }

  databaseHelpers.getUserByEmail (email).then (user => {
    if (!user) {
      console.log ('user not found.........');
      templateVars.error = 'No account plz register';
      return res.render ('index', templateVars);
    }
    //compares both inputed passwords
    const checkPassword = bcryptjs.compareSync (password, user.password);
    if (!checkPassword) {
      templateVars.error = 'Wrong password';
      return res.render ('index', templateVars);
    }
    req.session.user_id = user.id;
    console.log ('++++++++', req.session.user_id);
    templateVars.user = user;
    console.log ('+++++++++++++++++user+++++++++++++>>>', user);
    res.render ('index', user);
  });
});

app.post ('/logout', (req, res) => {
  req.session = null;
  return res.redirect ('/home');
});





// ____________PORT______________
app.listen (PORT, () => {
  console.log (`Example app listening on port ${PORT}`);
});
