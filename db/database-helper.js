const helpers = function (db) {
  //loads items for each category page
  const getItems = function () {
    return db
      .query (`SELECT * FROM items;`)
      .then (result => {
        return result.rows;
      })
      .catch (err => {
        console.log ('error!', err.message);
      });
  };

  const getUser = function (users_id) {
    return db
      .query (`SELECT * FROM users WHERE users.id = $1;`, [users_id])
      .then (result => {
        return result.rows;
      })
      .catch (err => {
        console.log ('error!', err.message);
      });
  };

  //Varifies whether a user is a seller or not
  const getSeller = function (seller_id) {
    return db
      .query (`SELECT * FROM items WHERE seller_id = $1;`, [seller_id])
      .then (result => {
        return result.rows;
      })
      .catch (err => {
        console.log ('error!', err.message);
      });
  };

  //gets thus user that has both a user and seller id
  const getUserSeller = function (user_id) {
    return db
      .query (
        `
        SELECT *
        FROM users
        JOIN items ON items.seller_id = users.id WHERE users.id = $1 AND seller_id is NOT NULL;`,
        [user_id]
      )
      .then (result => {
        return result.rows;
      })
      .catch (err => {
        console.log ('error!', err.message);
      });
  };

  const getUserByEmail = function (email) {
    return db
      .query (`SELECT * FROM users WHERE email = $1;`, [email])
      .then (result => {
        return result.rows[0];
      })
      .catch (err => {
        console.log ('error!', err.message);
      })
      .catch (err => {
        console.log ('error!', err.message);
      });
  };

  //allows users to be able to filter price using minimum-maximum price input
  const getItemsByPrice = function (minPrice = 0, maxPrice = 10000000) {
    let queryString = `SELECT * FROM items WHERE price >= $1 AND price <= $2;`;
    return db
      .query (queryString, [minPrice, maxPrice])
      .then (result => {
        console.log ('.....Result.rows.length: ', result.rows.length);
        return result.rows;
      })
      .catch (err => {
        console.log ('error!', err.message);
      });
  };

  const getCategory = function (category) {
    return db
      .query (`SELECT * FROM items WHERE category = $1;`, [category])
      .then (result => {
        return result.rows;
      })
      .catch (err => {
        console.log ('error!', err.message);
      });
  };

  const getFavourites = function (user_id) {
    return db
      .query (
        `
        SELECT *
        FROM items
        LEFT JOIN favourite_items ON items.id = favourite_items.items_id
        WHERE favourite_items.user_id = $1;
        `,
        [user_id]
      )
      .then (result => {
        console.log ('user_id: ', user_id);
        return result.rows;
      })
      .catch (err => {
        console.log ('error!', err.message);
      });
  };

  const getItem = function (items_id) {
    return db
      .query (`SELECT * FROM items WHERE items.id = $1;`, [items_id])
      .then (result => {
        return result.rows;
      })
      .catch (err => {
        console.log ('error!', err.message);
      });
  };

  //Adds a item to a users favourite item database
  const addFavourites = function (user_id, item_id) {
    const queryString = `
    INSERT INTO favourite_items (items_id, user_id)
    VALUES ($1, $2)
    RETURNING *;
    `;

    const values = [item_id, user_id];
    return db
      .query (queryString, values)
      .then (result => {
        console.log ('Result.rows: ', result.rows[0]);
        return result.rows[0];
      })
      .catch (err => console.log (err.message));
  };

  const itemSold = function (item_id) {
    const queryString = `
    UPDATE items
    SET sold = true
    WHERE items.id = $1
    `;
    const values = [item_id];
    return db
      .query (queryString, values)
      .then (result => {
        console.log ('Result.rows: ', result.rows[0]);
        return result.rows[0];
      })
      .catch (err => console.log (err.message));
  };

  //Allows only the admin to delete an item
  const removeItem = function (item_id) {
    const queryString = `
    DELETE FROM items WHERE items.id = $1;`;
    return db
      .query (queryString, [item_id])
      .then (result => {
        console.log ('------> GOOD TO GO!!!!!');
      })
      .catch (err => console.log (err.message));
  };

  //Adds/lists a new item to the items database
  const postItem = function (newItem) {
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
      newItem.seller_id,
    ];

    return db
      .query (queryString, values)
      .then (result => {
        console.log ('-------> new item on its way ------> ', result);
        return result.rows;
      })
      .catch (err =>
        console.log (
          err.message,
          "hmmmm....didn't function like it was supposed to."
        )
      );
  };

  return {
    getItems,
    getFavourites,
    getItem,
    getCategory,
    getItemsByPrice,
    getUser,
    getUserByEmail,
    addFavourites,
    removeItem,
    getSeller,
    getUserSeller,
    itemSold,
    postItem,
  };
};

module.exports = helpers;

//is line 29 the correct syntax to return new functions added into the helper function?
