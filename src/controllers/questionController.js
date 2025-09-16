const pool = require("../db/pool");
const questionService = require("../services/questionService");
const { getLoggedInUserNo } = require("../utils/sessionHelper");

// ----------------- 질문 작성 -----------------
async function createQuestion(req, res) {
  let userNo;
  try {
    // 세션에서 로그인된 사용자 번호 가져오기
    userNo = getLoggedInUserNo(req);
  } catch (err) {
    // 세션 정보 없으면 에러 반환
    return res.status(err.status).json({ error: err.message });
  }

  const { title, content } = req.body;

  // 필수 입력값 체크
  if (!title || !content)
    return res.status(400).json({ error: "제목과 내용을 입력해주세요." });

  try {
    // 서비스 레이어를 통해 질문 생성
    const row = await questionService.createQuestion(userNo, title, content);

    // 생성된 질문 정보와 함께 클라이언트에 반환
    res.json({
      message: "질문이 작성되었습니다.",
      documentId: row.questionNo?.toString() || null, // 질문 번호
      userNo: row.userNo?.toString() || null, // 작성자 번호
      username: row.username, // 작성자 이름
      title: row.title, // 제목
      content: row.content, // 내용
      queCreatedAt: row.queCreatedAt, // 작성일
    });
  } catch (err) {
    // DB나 서비스 레이어 오류 처리
    console.error(err);
    res.status(500).json({ error: "질문 작성 중 오류가 발생했습니다." });
  }
}

// ----------------- 질문 목록 조회 -----------------
async function getQuestions(req, res) {
  try {
    // 서비스 레이어에서 모든 질문 조회
    const rows = await questionService.getQuestions();

    // DB 결과를 클라이언트 친화적으로 변환
    const safeRows = rows.map((r) => ({
      documentId: r.questionNo?.toString() || null,
      userNo: r.userNo?.toString() || null,
      username: r.username,
      title: r.title,
      content: r.content,
      answer: r.answer, // 답변 여부/내용
      queCreatedAt: r.queCreatedAt, // 작성일
    }));

    res.json(safeRows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "질문 목록 조회 중 오류가 발생했습니다." });
  }
}

// ----------------- 단일 질문 조회 -----------------
async function getQuestionById(req, res) {
  try {
    // 파라미터로 전달된 ID 기준 질문 조회
    const row = await questionService.getQuestionByIdService(req.params.id);
    if (!row)
      return res.status(404).json({ error: "질문을 찾을 수 없습니다." });

    res.json({
      documentId: row.questionNo?.toString() || null,
      userNo: row.userNo?.toString() || null,
      username: row.username,
      title: row.title,
      content: row.content,
      answer: row.answer,
      queCreatedAt: row.queCreatedAt,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "질문 조회 중 오류가 발생했습니다." });
  }
}

// ----------------- 질문 삭제 -----------------
async function deleteQuestion(req, res) {
  let userNo;
  try {
    // 세션에서 로그인된 사용자 번호 확인
    userNo = getLoggedInUserNo(req);
  } catch (err) {
    return res.status(err.status).json({ error: err.message });
  }

  try {
    // 서비스 레이어를 통해 질문 삭제
    await questionService.removeQuestion(userNo, req.params.id);
    res.json({ message: "질문이 삭제되었습니다." });
  } catch (err) {
    console.error(err);
    // 서비스 레이어에서 발생한 상태 코드 처리
    if (err.status) return res.status(err.status).json({ error: err.message });
    res.status(500).json({ error: "질문 삭제 중 오류가 발생했습니다." });
  }
}

module.exports = {
  createQuestion,
  getQuestions,
  getQuestionById,
  deleteQuestion,
};
