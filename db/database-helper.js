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

    // Functions to verify if user is a seller
    const getSeller = function (seller_id) {
      return db
         .query(`SELECT * FROM items WHERE seller_id = $1;`, [seller_id])
         .then((result) => {
           return result.rows;
         })
         .catch((err) => {
          console.log('error!', err.message);
      })
    }

    const getUserSeller = function (user_id) {
      return db
        //  .query(`SELECT * FROM items WHERE seller_id is NOT NULL AND user_id = $1;`, [user_id])
        .query(`
        SELECT *
        FROM users
        JOIN items ON items.seller_id = users.id WHERE users.id = $1 AND seller_id is NOT NULL;`, [user_id]
        )
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
        SELECT DISTINCT *
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

  const addFavourites = function(user_id, item_id) {

    const queryString = `
    INSERT INTO favourite_items (items_id, user_id)
    VALUES ($1, $2)
    RETURNING *;
    `;

    const values = [
    item_id,
    user_id
    ]

    return db
      .query(queryString, values)
      .then((result) => {
        console.log("Result.rows: ", result.rows[0])
        return result.rows[0];
      })
      .catch((err) => console.log(err.message))
  };

  const itemSold = function(item_id) {

    // SELECT * FROM items WHERE buyer_id IS NOT NULL;
    const queryString = `
    UPDATE items
    SET sold = true
    WHERE items.id = $1
    `;
    const values = [item_id];
    return db
      .query(queryString, values)
      .then((result) => {
        console.log("Result.rows: ", result.rows[0])
        return result.rows[0];
      })
      .catch((err) => console.log(err.message))
  };

  //returns undefined items.id and {}
  const removeItem = function(item_id) {

    const queryString = (`
    DELETE FROM items WHERE items.id = $1;`);
    // const values =

    return db
      .query(queryString, [item_id])
      .then((result) => {
        console.log("------> GOOD TO GO!!!!!")
        // return result.rows[0];
      })
      .catch((err) => console.log(err.message))
  };

  // ADD new item
  const postItem = function(newItem) {
// ('Ruched Sweetheart Neck Velvet Bodycon Dress', 26.00, 'xoxo green velvet body dress'
//  'https://img.ltwebstatic.com/images3_pi/2020/11/20/16058551232dc741f0c163e3f8015a95bfe50edafa.webp', 'https://img.ltwebstatic.com/images3_pi/2020/11/20/16058551232dc741f0c163e3f8015a95bfe50edafa_thumbnail_600x.webp',3 , 1, false, 1);

    const queryString = `
    INSERT INTO items (
      title, price, description, cover_photo_url, thumbnail_photo_url, category, user_id, sold, seller_id)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
      RETURNING *;
    `;

    const values = [
      newItem.title,
      newItem.price,
      newItem.description,
      newItem.cover_photo_url,
      newItem.thumbnail_photo_url,
      newItem.category,
      newItem.user_id,
      newItem.sold,
      newItem.seller_id
    ];


    return db
      .query(queryString, values)
      .then((result) => {
        console.log("-------> new item on its way ------> ", result);
        return result.rows;
      })
      .catch((err) => console.log(err.message, "hmmmm....didn't function like it was supposed to."))

    };


return {getItems, getFavourites, getItem, getCategory, getItemsByPrice, getUser, getUserByEmail, addFavourites, removeItem, getSeller, getUserSeller, itemSold, postItem };
};





  module.exports = helpers;

  //is line 29 the correct syntax to return new functions added into the helper function?

