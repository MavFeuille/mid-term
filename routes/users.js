/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into api/users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();
const cookieSession = require('cookie-session');
router.use(cookieSession({
  name: "session",
  keys: ["eSgVkYp3s6v9y$B&E)H@McQfTjWmZq4t", "z$C&F)J@NcRfUjWnZr4u7x!A%D*G-KaP" ]
}));


module.exports = (db) => {

  router.get("/", (req, res) => {
    req.session.userID = req.params.id;

    db.query(`SELECT * FROM users;`)
      .then(data => {
        const users = data.rows;
        res.json({ users });
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });
  return router;

};
