const dbConfig = require("./dbConfig");
const sessionConfig = require("./sessionConfig");

module.exports = {
  FRONT_PORT: 3000, // 프론트엔드 포트
  BACKEND_PORT: 5000, // 백엔드 포트
  DB_CONFIG: dbConfig,
  SESSION: sessionConfig,
};
