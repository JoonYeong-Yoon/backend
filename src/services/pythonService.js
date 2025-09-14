const { spawn } = require("child_process");
const path = require("path");

// ----------------- Python 예측 실행 -----------------
function runPythonPredict(tempFilePath) {
  return new Promise((resolve, reject) => {
    // Python 스크립트 실행
    const py = spawn("python", [
      path.join(__dirname, "../python/predict.py"), // 스크립트 경로
      tempFilePath, // 인자로 이미지 파일 경로 전달
    ]);

    let data = "";

    // Python stdout 데이터 수집
    py.stdout.on("data", (chunk) => (data += chunk.toString()));

    // Python stderr 출력 (오류 로그)
    py.stderr.on("data", (err) => console.error(err.toString()));

    // Python 프로세스 종료 시
    py.on("close", () => {
      try {
        // 수집한 데이터(JSON 문자열)를 객체로 변환
        resolve(JSON.parse(data));
      } catch (err) {
        reject(err); // JSON 파싱 실패 시 오류 반환
      }
    });
  });
}

module.exports = { runPythonPredict };
