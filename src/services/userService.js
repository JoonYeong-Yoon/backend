const bcrypt = require("bcryptjs");
const { findByUserUid, createUser } = require("../models/user");

// ----------------- 회원가입 -----------------
async function signup(userUid, password, name, phoneNumber) {
  const exists = await findByUserUid(userUid);
  if (exists) throw new Error("이미 존재하는 사용자명입니다.");

  // 비밀번호 해시 처리
  const hashed = await bcrypt.hash(password, 10);
  await createUser(userUid, hashed, name, phoneNumber);
  return { message: "회원가입 성공" };
}

// ----------------- 로그인 -----------------
async function login(userUid, password) {
  const user = await findByUserUid(userUid);
  if (!user) throw new Error("아이디 또는 비밀번호가 잘못되었습니다.");

  const ok = await bcrypt.compare(password, user.password);
  if (!ok) throw new Error("아이디 또는 비밀번호가 잘못되었습니다.");

  return; // 로그인 성공 시 아무 값 반환하지 않음
}

// ----------------- 로그아웃 -----------------
function logout(req) {
  return new Promise((resolve, reject) => {
    if (!req.session.user) return resolve("이미 로그아웃 상태입니다.");
    req.session.destroy((err) => {
      if (err) return reject(err);
      resolve("로그아웃 완료");
    });
  });
}

// ----------------- DB 테스트 -----------------
/* 
1. 필요한 경우

DB 연결이 제대로 되는지 확인하고 싶을 때

서버 초기 상태에서 DB 목록을 확인하거나 디버깅 용도로 사용할 때

2. 운영 환경에서는 필요 없음

일반 사용자가 호출할 필요 없는 함수

보안상 외부에 노출되면 안 됨

실제 서비스에는 제거하거나, 관리자 전용 API로만 제한하는 게 좋음 
*/
async function getAllDBLists() {
  const conn = await require("../db/pool").getConnection();
  try {
    const rows = await conn.query("SHOW DATABASES;");
    return rows;
  } finally {
    conn.release();
  }
}

module.exports = { signup, login, logout, getAllDBLists };
