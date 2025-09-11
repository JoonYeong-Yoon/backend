// 로그인된 사용자 정보 가져오기
function getLoggedInUserNo(req) {
  const userNo = req.session.user?.userNo;
  if (!userNo) {
    const err = new Error("로그인이 필요합니다.");
    err.status = 401;
    throw err;
  }
  return userNo;
}

module.exports = { getLoggedInUserNo };
