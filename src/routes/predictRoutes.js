const express = require("express");
const router = express.Router();
const upload = require("../middlewares/uploadMiddleware");
const { predictController } = require("../controllers/predictController");

// 단일 이미지 업로드
router.post("/", upload.single("image"), predictController);

module.exports = router;
