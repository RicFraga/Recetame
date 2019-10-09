const { Pool } = require("pg");

const pool = new Pool({
  user: "postgres",
  host: "127.0.0.1",
  database: "proyecto_adoo",
  password: "root",
  port: 9703,
});
module.exports = pool;