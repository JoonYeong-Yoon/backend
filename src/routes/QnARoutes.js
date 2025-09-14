const express = require("express");
const router = express.Router();
const {
  createQuestion,
  getQuestions,
  getQuestionById,
  deleteQuestion,
} = require("../controllers/questionController"); // 단수 post
const authMiddleware = require("../middlewares/authMiddleware");

// 게시글 작성 (로그인 필요)
router.post("/", authMiddleware, createQuestion);

// 게시글 전체 조회
router.get("/", getQuestions);

// 🔹 단건 조회
router.get("/:id", getQuestionById);

// 단일 게시글 삭제
router.delete("/:id", deleteQuestion);

module.exports = router;
