const {
  saveTempFile,
  saveUploadFile,
  removeFile,
} = require("../utils/fileHelper");
const { runPythonPredict } = require("../services/pythonService");
const { insertResult } = require("../models/results");
const { getLoggedInUserNo } = require("../utils/sessionHelper");

// ----------------- 이미지 예측 컨트롤러 -----------------
const predictController = async (req, res) => {
  // 1️⃣ 업로드 파일 체크
  if (!req.file) return res.status(400).json({ error: "사진이 필요합니다." });

  // 2️⃣ 로그인된 사용자 정보 확인
  let userNo;
  try {
    userNo = getLoggedInUserNo(req); // 세션에서 userNo 가져오기
  } catch (err) {
    return res.status(err.status).json({ error: err.message });
  }

  // 3️⃣ 파일 이름 및 저장 경로 생성
  const filename = `${Date.now()}_${req.file.originalname}`;
  const tempFilePath = saveTempFile(req.file.buffer, filename); // 임시 폴더
  const uploadPath = saveUploadFile(req.file.buffer, filename); // 업로드 폴더

  try {
    // 4️⃣ Python 모델로 예측 실행
    const result = await runPythonPredict(tempFilePath);

    // 5️⃣ 예측 결과 로그 (백엔드에서만 출력)
    console.log("=== 예측 확률 ===");
    for (const [disease, prob] of Object.entries(result.probabilities)) {
      console.log(`${disease}: ${(prob * 100).toFixed(2)}%`);
    }
    console.log("================");

    // 6️⃣ DB에 결과 저장
    await insertResult(
      userNo, // 사용자 번호
      result.maxDisease, // 가장 확률 높은 질병
      result.maxAccuracy, // 예측 확률
      uploadPath // 업로드된 이미지 경로
    );

    // 7️⃣ 클라이언트에 메시지 반환
    res.json({ message: result.message });
  } catch (err) {
    // 예측 과정에서 에러 발생 시
    res.status(500).json({ error: err.message });
  } finally {
    // 8️⃣ 임시 파일 삭제 (항상 실행)
    removeFile(tempFilePath);
  }
};

module.exports = { predictController };
