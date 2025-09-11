const express = require("express");
const router = express.Router();
const { createPost, getPosts } = require("../controllers/postController"); // 단수 post
const authMiddleware = require("../middlewares/authMiddleware");

// 게시글 작성 (로그인 필요)
router.post("/", authMiddleware, createPost);

// 게시글 전체 조회
router.get("/", getPosts);

module.exports = router;
