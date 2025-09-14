const pool = require("../db/pool");

// ----------------- 결과 삽입 -----------------
async function insertResult(userNo, diseaseName, accuracy, uploadImage) {
  const conn = await pool.getConnection(); // 커넥션 가져오기
  try {
    // results 테이블에 새 레코드 삽입
    await conn.query(
      `INSERT INTO results (userNo, diseaseName, accuracy, uploadImage) 
       VALUES (?, ?, ?, ?)`,
      [userNo, diseaseName, accuracy, uploadImage]
    );
  } finally {
    conn.release(); // 커넥션 반환
  }
}

module.exports = { insertResult };
