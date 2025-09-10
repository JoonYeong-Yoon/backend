const express = require("express");
const {
  jsonMiddleware,
  corsMiddleware,
  cookieMiddleware,
} = require("./middlewares");
const { BACKEND_PORT } = require("./config");
const userRoutes = require("./routes/userRoutes");

// ----------------- 서버 -----------------
const app = express();

app.use(jsonMiddleware);
app.use(corsMiddleware);
app.use(cookieMiddleware);

// ----------------- 라우트 -----------------
app.use("/users", userRoutes); // /users/signup, /users/login, /users/test

// ----------------- 서버 기동 -----------------
app.listen(BACKEND_PORT, () => {
  console.log(`🚀 Server running on http://localhost:${BACKEND_PORT}`);
});
