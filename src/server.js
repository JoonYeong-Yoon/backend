const express = require("express");
const {
  jsonMiddleware,
  corsMiddleware,
  cookieMiddleware,
  sessionMiddleware,
} = require("./middlewares");
const { BACKEND_PORT } = require("./config");
const userRoutes = require("./routes/userRoutes");
const postsRouter = require("./routes/posts");
const predictRouter = require("./routes/predictRoutes");

// ----------------- 서버 -----------------
const app = express();

app.use(jsonMiddleware);
app.use(corsMiddleware);
app.use(cookieMiddleware);
app.use(sessionMiddleware);

// ----------------- 라우트 -----------------
app.use("/users", userRoutes); // /users/signup, /users/login
app.use("/api/posts", postsRouter);
app.use("/api/predict", predictRouter);

// ----------------- 테스트용 라우트 -----------------
app.get("/check-session", (req, res) => {
  console.log(req.session.user);
  res.json({ session: req.session });
});

// ----------------- 서버 기동 -----------------
app.listen(BACKEND_PORT, () => {
  console.log(`🚀 Server running on http://localhost:${BACKEND_PORT}`);
});
