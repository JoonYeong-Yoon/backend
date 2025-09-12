const express = require("express");
const router = express.Router();
const signupController = require("../controllers/signupController");
const loginController = require("../controllers/loginController");
const logoutController = require("../controllers/logoutController");

// 회원가입
router.post("/signup", signupController);

// 로그인
router.post("/login", loginController);

// 로그아웃
router.post("/logout", logoutController);

// 로그인 유지
router.get("/check", (req, res) => {
  if (req.session && req.session.user) {
    // 세션에 user 정보가 있으면 로그인 상태
    res.json({ isLoggedIn: true, user: req.session.user });
  } else {
    res.json({ isLoggedIn: false });
  }
});

module.exports = router;
