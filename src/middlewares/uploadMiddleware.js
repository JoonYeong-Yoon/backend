const multer = require("multer");

// 메모리 저장 (실제 파일 시스템에 저장하지 않음)
const storage = multer.memoryStorage();
const upload = multer({ storage });

module.exports = upload;
