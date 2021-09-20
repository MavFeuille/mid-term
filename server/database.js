const { Pool } = require('pg');


const config = {
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASS,
  port: 5432
};

const pool = new Pool(config);
pool.connect(() => {
  console.log('Connected to datase');
});


const getItemCoverPhoto = function () {

}


