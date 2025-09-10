module.exports = {
  secret: "my-secret",
  resave: false,
  saveUninitialized: true,
  cookie: {
    maxAge: 2 * 60 * 60 * 1000, // 2시간 유지
    httpOnly: true, // 자바스크립트에서 쿠키 접근 못하게 (보안 강화)
  },
};
