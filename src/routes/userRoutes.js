const express = require("express");
const router = express.Router();
const signupController = require("../controllers/signupController");
const loginController = require("../controllers/loginController");

// 회원가입
router.post("/signup", signupController);

// 로그인
router.post("/login", loginController);

module.exports = router;
