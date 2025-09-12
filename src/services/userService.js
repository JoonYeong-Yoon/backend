const bcrypt = require("bcryptjs");
const { findByUserUid, createUser } = require("../models/users");

// 회원가입
async function signup(userUid, password, name, phoneNumber) {
  const exists = await findByUserUid(userUid);
  if (exists) throw new Error("이미 존재하는 사용자명입니다.");

  const hashed = await bcrypt.hash(password, 10);
  await createUser(userUid, hashed, name, phoneNumber);
  return { message: "회원가입 성공" };
}

// 로그인
async function login(userUid, password) {
  const user = await findByUserUid(userUid);
  if (!user) throw new Error("아이디 또는 비밀번호가 잘못되었습니다.");

  const ok = await bcrypt.compare(password, user.password);
  if (!ok) throw new Error("아이디 또는 비밀번호가 잘못되었습니다.");

  return;
}

// DB 테스트 (여전히 서비스 안에 두거나 별도 모델 만들어도 됨)
async function getAllDBLists() {
  const conn = await require("../db/pool").getConnection();
  try {
    const rows = await conn.query("SHOW DATABASES;");
    return rows;
  } finally {
    conn.release();
  }
}

module.exports = { signup, login, getAllDBLists };
