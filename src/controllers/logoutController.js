async function logoutController(req, res) {
  // 세션이 존재하는 경우 삭제
  if (req.session.user) {
    req.session.destroy((err) => {
      if (err) {
        return res
          .status(500)
          .json({ error: "로그아웃 중 오류가 발생했습니다." });
      }
      res.clearCookie("connect.sid"); // 세션 쿠키 삭제
      res.json({ message: "로그아웃 완료" });
    });
  } else {
    // 이미 로그아웃 상태여도 에러 없이 200 반환
    res.json({ message: "이미 로그아웃 상태입니다." });
  }
}

module.exports = logoutController;
