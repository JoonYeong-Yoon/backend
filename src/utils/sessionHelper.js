// ----------------- 로그인된 사용자 정보 가져오기 -----------------
function getLoggedInUserNo(req) {
  // 세션에 user 객체가 있고 userNo가 있으면 가져오기
  const userNo = req.session.user?.userNo;

  // 로그인 정보가 없으면 에러 발생
  if (!userNo) {
    const err = new Error("로그인이 필요합니다.");
    err.status = 401; // HTTP 상태 코드 401 Unauthorized
    throw err;
  }

  // 로그인된 사용자의 userNo 반환
  return userNo;
}
module.exports = { getLoggedInUserNo };
