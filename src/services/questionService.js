const {
  insertQuestion,
  findQuestionById,
  findAllQuestions,
  deleteQuestionById,
} = require("../models/question");

// ----------------- 질문 작성 -----------------
async function createQuestion(userNo, title, content) {
  const insertId = await insertQuestion(userNo, title, content);
  const row = await findQuestionById(insertId); // 작성 직후 데이터 조회
  return row;
}

// ----------------- 모든 질문 조회 -----------------
async function getQuestions() {
  const rows = await findAllQuestions();
  return rows;
}

// ----------------- 단건 질문 조회 -----------------
async function getQuestionByIdService(id) {
  const row = await findQuestionById(id);
  return row;
}

// ----------------- 질문 삭제 -----------------
async function removeQuestion(userNo, questionId) {
  const row = await findQuestionById(questionId);
  if (!row) throw { status: 404, message: "질문을 찾을 수 없습니다." };
  if (row.userNo !== userNo)
    throw { status: 403, message: "본인 질문만 삭제할 수 있습니다." };
  await deleteQuestionById(questionId);
  return;
}

module.exports = {
  createQuestion,
  getQuestions,
  getQuestionByIdService,
  removeQuestion,
};
