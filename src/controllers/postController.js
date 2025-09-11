const pool = require("../db/pool");

// 게시글 작성
const createPost = async (req, res) => {
  const userid = req.session.user?.id;
  const { title, content } = req.body;

  if (!userid) return res.status(401).json({ error: "로그인이 필요합니다." });
  if (!title || !content)
    return res.status(400).json({ error: "제목과 내용을 입력해주세요." });

  let conn;
  try {
    conn = await pool.getConnection();
    const result = await conn.query(
      "INSERT INTO posts (userid, title, content) VALUES (?, ?, ?)",
      [userid, title, content]
    );
    res.json({ message: "게시글이 작성되었습니다.", postId: result.insertId });
  } catch (err) {
    res.status(500).json({ error: err.message });
  } finally {
    if (conn) conn.release();
  }
};

// 게시글 전체 조회
const getPosts = async (req, res) => {
  let conn;
  try {
    conn = await pool.getConnection();
    const rows = await conn.query(`
      SELECT p.id, p.title, p.content, p.created_at, u.name as username
      FROM posts p
      JOIN users u ON p.userid = u.id
      ORDER BY p.created_at DESC
    `);
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  } finally {
    if (conn) conn.release();
  }
};

module.exports = { createPost, getPosts };
