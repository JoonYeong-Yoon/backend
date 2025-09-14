const multer = require("multer");

// 메모리 저장 (실제 파일 시스템에 저장하지 않음)
const storage = multer.memoryStorage();
const upload = multer({ storage });

module.exports = upload;

// memoryStorage

// 업로드된 파일이 서버 메모리에만 존재

// DB 저장, 다른 API 전송 등 임시 처리에 적합

// 서버 재시작 시 파일은 사라짐
