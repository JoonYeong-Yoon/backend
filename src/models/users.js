const pool = require("../db/pool");

// userUid로 사용자 조회
async function findByUserUid(userUid) {
  const rows = await pool.query("SELECT * FROM users WHERE userUid = ?", [
    userUid,
  ]);
  return rows[0] || null;
}

// 새 사용자 생성
async function createUser(userUid, hashedPassword, name, phoneNumber) {
  await pool.query(
    "INSERT INTO users (userUid, password, name, phoneNumber, createAt) VALUES (?, ?, ?, ?, NOW())",
    [userUid, hashedPassword, name, phoneNumber]
  );
}

module.exports = { findByUserUid, createUser };
