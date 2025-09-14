const pool = require("../db/pool");

// 질문 조회 시 필요한 필드 정의
const QUESTION_SELECT_FIELDS = `
  q.questionNo, q.userNo, q.title, q.content, q.answer, q.queCreatedAt, u.name as username
`;

// ----------------- 질문 삽입 -----------------
async function insertQuestion(userNo, title, content) {
  const conn = await pool.getConnection();
  try {
    // questions 테이블에 새로운 질문 삽입
    const result = await conn.query(
      "INSERT INTO questions (userNo, title, content) VALUES (?, ?, ?)",
      [userNo, title, content]
    );
    // 삽입된 질문의 ID 반환
    return result.insertId;
  } finally {
    conn.release(); // 커넥션 반환
  }
}

// ----------------- ID로 단일 질문 조회 -----------------
async function findQuestionById(id) {
  const conn = await pool.getConnection();
  try {
    // users 테이블과 JOIN하여 작성자 이름 포함 조회
    const rows = await conn.query(
      `SELECT ${QUESTION_SELECT_FIELDS}
       FROM questions q
       JOIN users u ON q.userNo = u.userNo
       WHERE q.questionNo = ?`,
      [id]
    );
    // 존재하지 않으면 null 반환
    return rows[0] || null;
  } finally {
    conn.release();
  }
}

// ----------------- 모든 질문 조회 -----------------
async function findAllQuestions() {
  const conn = await pool.getConnection();
  try {
    // 작성일 기준 내림차순으로 모든 질문 조회
    return await conn.query(
      `SELECT ${QUESTION_SELECT_FIELDS}
       FROM questions q
       JOIN users u ON q.userNo = u.userNo
       ORDER BY q.questionNo DESC`
    );
  } finally {
    conn.release();
  }
}

// ----------------- ID로 질문 삭제 -----------------
async function deleteQuestionById(id) {
  const conn = await pool.getConnection();
  try {
    return await conn.query("DELETE FROM questions WHERE questionNo = ?", [id]);
  } finally {
    conn.release();
  }
}

// 모듈로 내보내기
module.exports = {
  insertQuestion,
  findQuestionById,
  findAllQuestions,
  deleteQuestionById,
};
