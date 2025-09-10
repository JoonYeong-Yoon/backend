const mariadb = require("mariadb");
const { DB_CONFIG } = require("../config");

// MariaDB 연결 풀 생성
const pool = mariadb.createPool(DB_CONFIG);

module.exports = pool;
