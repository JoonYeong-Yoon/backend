const fs = require("fs");
const path = require("path");

// ----------------- 임시 파일 저장 -----------------
// Buffer 형태의 파일 데이터를 임시 폴더에 저장
// Python 예측 모델 등에서 임시로 파일을 읽어야 할 때 사용
function saveTempFile(buffer, filename) {
  const tempFilePath = path.join(__dirname, "../temp", filename);

  // 폴더가 존재하지 않으면 생성
  if (!fs.existsSync(path.dirname(tempFilePath)))
    fs.mkdirSync(path.dirname(tempFilePath));

  // 파일 저장
  fs.writeFileSync(tempFilePath, buffer);
  return tempFilePath; // 저장 경로 반환
}

// ----------------- 업로드 파일 저장 -----------------
// 실제 업로드된 파일을 서버 uploads 폴더에 저장
function saveUploadFile(buffer, filename) {
  const uploadDir = path.join(__dirname, "../uploads");
  if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir); // 폴더 없으면 생성

  const uploadPath = path.join(uploadDir, filename);
  fs.writeFileSync(uploadPath, buffer);

  // 경로를 상대경로 형태로 반환 (DB에 저장 시 사용)
  return uploadPath.replace(/\\/g, "/").split("/").slice(-2).join("/");
}

// ----------------- 파일 삭제 -----------------
// 주어진 경로에 파일이 존재하면 삭제
function removeFile(filePath) {
  if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
}

module.exports = { saveTempFile, saveUploadFile, removeFile };
