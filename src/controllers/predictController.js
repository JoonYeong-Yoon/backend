const fs = require("fs");
const path = require("path");
const { spawn } = require("child_process");

// Python 스크립트 실행 함수
function runPythonPredict(tempFilePath) {
  return new Promise((resolve, reject) => {
    const py = spawn("python", [
      path.join(__dirname, "../python/predict.py"),
      tempFilePath,
    ]);

    let data = "";
    py.stdout.on("data", (chunk) => (data += chunk.toString()));
    py.stderr.on("data", (err) => console.error(err.toString()));

    py.on("close", () => resolve(JSON.parse(data)));
  });
}

const predictController = async (req, res) => {
  if (!req.file) return res.status(400).json({ error: "사진이 필요합니다." });

  // Buffer → 임시 파일 저장 (Python에서 읽기 위해)
  const tempFilePath = path.join(__dirname, "../python/temp_image.jpg");
  console.log("👉 Saving temp file at:", tempFilePath);
  fs.writeFileSync(tempFilePath, req.file.buffer);
  console.log("✅ Temp file saved:", fs.existsSync(tempFilePath));

  try {
    const result = await runPythonPredict(tempFilePath);
    // 🔹 백엔드 터미널에서만 확률 출력
    console.log("=== 예측 확률 ===");
    for (const [disease, prob] of Object.entries(result.probabilities)) {
      console.log(`${disease}: ${(prob * 100).toFixed(2)}%`);
    }
    console.log("================");

    // 🔹 프론트에는 메시지만 전달
    res.json({ message: result.message });
  } catch (err) {
    res.status(500).json({ error: err.message });
  } finally {
    fs.unlinkSync(tempFilePath);
  }
};

module.exports = { predictController };
