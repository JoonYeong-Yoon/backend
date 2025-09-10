const cors = require("cors");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const config = require("../config");

// ----------------- CORS -----------------
const corsMiddleware = cors({
  origin: [`http://localhost:${config.FRONT_PORT}`],
  credentials: true,
});

// ----------------- 세션 -----------------
const sessionMiddleware = session(config.SESSION);

// ----------------- Export -----------------
module.exports = {
  jsonMiddleware: require("express").json(),
  corsMiddleware,
  cookieMiddleware: cookieParser(),
  sessionMiddleware,
};
