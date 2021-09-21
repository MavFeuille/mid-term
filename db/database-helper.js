const helpers = function (db) {
  const getItems = function () {
    return db
     .query(`SELECT * FROM items`)
     .then((result) => {
       return result.rows;
     })
     .catch((err) => {
       null;
  })
  }
return {getItems};
};

module.exports = helpers;



