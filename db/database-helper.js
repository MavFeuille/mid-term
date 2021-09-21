const helpers = function (db) {
//function to get items for Category page
  const getItems = function () {
    return db
     .query(`SELECT * FROM items`)
     .then((result) => {
       return result.rows;
     })
     .catch((err) => {
      console.log('error!', err.message);
  })
}

  const getCategory = function (category) {
    return db
    .query(`SELECT * FROM items WHERE category = $1`, [category])
    .then((result) => {
      return result.rows;
    })
    .catch((err) => {
      console.log('error!', err.message);
    })
  }

  const getFavourites = function () {
    return db
    .query(`SELECT * FROM favourite_items LEFT JOIN items ON favourites.items_id = items.id`)
    .then((result) => {
      return result.rows;
    })
    .catch((err) => {
      console.log('error!', err.message);
    })
  }

//make db filter helper function to select item by id with a WHERE in there.
const getItem = function (items_id) {
  return db
   .query(`SELECT * FROM items WHERE items.id = $1`,[items_id])
   .then((result) => {
     return result.rows;
   })
   .catch((err) => {
     console.log('error!', err.message);
})
}

return {getItems, getFavourites, getItem, getCategory};
};





module.exports = helpers;

//is line 29 the correct syntax to return new functions added into the helper function?

