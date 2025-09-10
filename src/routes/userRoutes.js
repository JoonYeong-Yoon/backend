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

module.exports = router;
