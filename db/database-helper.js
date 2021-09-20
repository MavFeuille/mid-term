const helpers = function (db) {
  const getItem = function () {
    return db
     .query(`SELECT * FROM items`)
     .then((result) => {
       return result.rows;
     })
     .catch((err) => {
       null;
  })
  }

  // getItemCoverPhoto();














return {getItem};
};

module.exports = helpers;



