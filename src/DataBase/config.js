const { Pool } = require('pg');
require("dotenv").config({ path: "./.env" });

const pool = new Pool({
  user: env.USER,
  host: env.HOST,
  database: env.NAME,
  password: env.PASSWORD,
  port: env.PORT,
  
});
pool.connect((err, client, release) => {
  if (err) {
    return console.error('Error acquiring client', err.stack);
  }
  console.log('Conexión exitosa a la base de datos');
  release();
});

module.exports = pool;