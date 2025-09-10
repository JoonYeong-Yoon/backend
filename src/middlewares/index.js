const cors = require("cors");
const cookieParser = require("cookie-parser");
const config = require("../config");

const corsMiddleware = cors({
  origin: [`http://localhost:${config.FRONT_PORT}`],
  credentials: true,
});

module.exports = {
  jsonMiddleware: require("express").json(),
  corsMiddleware,
  cookieMiddleware: cookieParser(),
};
