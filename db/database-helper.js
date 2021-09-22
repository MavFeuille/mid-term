const helpers = function (db) {
  //function to get items for Category page
      const getItems = function () {
        return db
         .query(`SELECT * FROM items;`)
         .then((result) => {
           return result.rows;
         })
         .catch((err) => {
          console.log('error!', err.message);
      })
    }

    //function to get users
    const getUser = function (users_id) {
      return db
         .query(`SELECT * FROM users WHERE users.id = $1;`, [users_id])
         .then((result) => {
           return result.rows;
         })
         .catch((err) => {
          console.log('error!', err.message);
      })
    }

    const getUserByEmail = function (email) {
      return db
         .query(`SELECT * FROM users WHERE email = $1;`, [email])
         .then((result) => {
           return result.rows[0];
         })
         .catch((err) => {
          console.log('error!', err.message);
      })

    }

    //call get items for given min and max price will go to values, else renders default
    // so ask users what min and max price they WebAuthentication. also check webs
      const getItemsByPrice = function (minPrice = 0, maxPrice = 10000000) {
        // condition
        //btwn function
        let queryString = `SELECT * FROM items WHERE price >= $1 AND price <= $2;`
        return db
        .query(queryString, [minPrice, maxPrice])
        .then((result) => {
          // console.log("minPrice: ", minPrice);
          console.log(".....Result.rows.length: ", result.rows.length);
           return result.rows;
         })
         .catch((err) => {
          console.log('error!', err.message);
      })
    }




    const getCategory = function (category) {
      return db
      .query(`SELECT * FROM items WHERE category = $1;`, [category])
      .then((result) => {
        return result.rows;
      })
      .catch((err) => {
        console.log('error!', err.message);
      })
    }


    const getFavourites = function (user_id) {
      return db
      .query(`
        SELECT *
        FROM items
        LEFT JOIN favourite_items ON items.id = favourite_items.items_id
        WHERE favourite_items.user_id = $1;
        `  , [user_id])
      .then((result) => {
        console.log("user_id: ", user_id);
        return result.rows;
      })
      .catch((err) => {
        console.log('error!', err.message);
      })
    }

    //make db filter helper function to select item by id with a WHERE in there.
    const getItem = function (items_id) {
      return db
       .query(`SELECT * FROM items WHERE items.id = $1;`,[items_id])
       .then((result) => {
         return result.rows;
       })
       .catch((err) => {
         console.log('error!', err.message);
    })
    }

  const addFavourites = function(user_id, item) {

    const queryString = `
    INSERT INTO favourite_items (items_id, user_id)
    VALUES ($1, $2)
    RETURNING *;
    `;

<<<<<<< HEAD
    const values = [
      favourite_items.items_id,
      favourite_items.user_id
    ]

    return pool
      .query(queryString, values)
      .then((result) => {
        console.log("Result.rows: ", result.rows[0])
        return result.rows[0];
      })
      .catch((err) => console.log(err.message))

  //   const queryString = `
  // INSERT INTO properties (owner_id, title, description, thumbnail_photo_url, cover_photo_url, cost_per_night, parking_spaces, number_of_bathrooms, number_of_bedrooms, country, street, city, province, post_code)
  // VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14)
  // RETURNING *;
  //   const values = [
  //     favourite_items.items_id
  //     favourite_items.user_id

  //     // property.owner_id,
  //     // property.title,
  //     // property.description,
  //     // property.thumbnail_photo_url,
  //     // property.cover_photo_url,
  //     // property.cost_per_night,
  //     // property.parking_spaces,
  //     // property.number_of_bathrooms,
  //     // property.number_of_bedrooms,
  //     // property.country,
  //     // property.street,
  //     // property.city,
  //     // property.province,
  //     // property.post_code,
  //   ];


  };




return {getItems, getFavourites, getItem, getCategory, getItemsByPrice, getUser, getUserByEmail, addFavourites  };
};
=======
  return {getItems, getFavourites, getItem, getCategory, getItemsByPrice, getUser, getUserByEmail  };
  };
>>>>>>> 67efed56e08166c8b878d3da6d751c356891d287





  module.exports = helpers;

  //is line 29 the correct syntax to return new functions added into the helper function?

