const { logout } = require("../../services/userService");

// 로그아웃 요청 처리 컨트롤러
async function logoutController(req, res) {
  try {
    // 세션 삭제 처리
    const message = await logout(req);

    // 세션 쿠키 삭제
    // 'connect.sid'는 express-session 기본 쿠키 이름
    res.clearCookie("connect.sid");

    // 성공 메시지 반환
    res.json({ message });
  } catch (err) {
    // 로그아웃 처리 중 오류 발생 시 500 Internal Server Error 반환
    res.status(500).json({ error: "로그아웃 중 오류가 발생했습니다." });
  }
}

module.exports = logoutController;
