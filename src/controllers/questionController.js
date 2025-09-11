const pool = require("../db/pool");
const { getLoggedInUserNo } = require("../utils/sessionHelper");

// 질문 작성
const createQuestion = async (req, res) => {
  let userNo;
  try {
    userNo = getLoggedInUserNo(req);
  } catch (err) {
    return res.status(err.status).json({ error: err.message });
  }

  const { title, content } = req.body;
  if (!title || !content)
    return res.status(400).json({ error: "제목과 내용을 입력해주세요." });

  let conn;
  try {
    conn = await pool.getConnection();
    const result = await conn.query(
      "INSERT INTO questions (userNo, title, content) VALUES (?, ?, ?)",
      [userNo, title, content]
    );
    res.json({
      message: "질문이 작성되었습니다.",
      documentId: result.insertId.toString(), // documentId 유지
      userUid: userNo.toString(),
      title,
      content,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  } finally {
    if (conn) conn.release();
  }
};

// 질문 전체 조회 (로그인 필요 없음)
const getQuestions = async (req, res) => {
  let conn;
  try {
    conn = await pool.getConnection();
    const rows = await conn.query(`
      SELECT q.questionNo, q.userNo, q.title, q.content, q.answer, u.name as username
      FROM questions q
      JOIN users u ON q.userNo = u.userNo
      ORDER BY q.questionNo DESC
    `);

    const safeRows = rows.map((r) => ({
      ...r,
      documentId: r.questionNo?.toString() || null,
      userNo: r.userNo?.toString() || null,
      username: r.username,
      title: r.title,
      content: r.content,
      answer: r.answer,
    }));

    res.json(safeRows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  } finally {
    if (conn) conn.release();
  }
};

// 단건 질문 조회
const getQuestionById = async (req, res) => {
  const { id } = req.params;
  let conn;
  try {
    conn = await pool.getConnection();
    const rows = await conn.query(
      `SELECT q.questionNo, q.userNo, q.title, q.content, q.answer, u.userUid as username
       FROM questions q
       JOIN users u ON q.userNo = u.userNo
       WHERE q.questionNo = ?`,
      [id]
    );

    if (rows.length === 0)
      return res.status(404).json({ error: "질문을 찾을 수 없습니다." });

    const row = rows[0];
    res.json({
      ...row,
      documentId: row.questionNo?.toString() || null,
      userNo: row.userNo?.toString() || null,
      username: row.username,
      title: row.title,
      content: row.content,
      answer: row.answer,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  } finally {
    if (conn) conn.release();
  }
};

// 질문 삭제
const deleteQuestion = async (req, res) => {
  const { id } = req.params;
  let userNo;
  try {
    userNo = getLoggedInUserNo(req);
  } catch (err) {
    return res.status(err.status).json({ error: err.message });
  }

  let conn;
  try {
    conn = await pool.getConnection();
    const rows = await conn.query(
      "SELECT * FROM questions WHERE questionNo = ?",
      [id]
    );
    if (rows.length === 0)
      return res.status(404).json({ error: "질문을 찾을 수 없습니다." });

    const question = rows[0];
    if (question.userNo !== userNo)
      return res.status(403).json({ error: "본인 질문만 삭제할 수 있습니다." });

    await conn.query("DELETE FROM questions WHERE questionNo = ?", [id]);
    res.json({ message: "질문이 삭제되었습니다." });
  } catch (err) {
    res.status(500).json({ error: err.message });
  } finally {
    if (conn) conn.release();
  }
};

module.exports = {
  createQuestion,
  getQuestions,
  getQuestionById,
  deleteQuestion,
};
