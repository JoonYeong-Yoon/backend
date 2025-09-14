const userService = require("../../services/userService");
const { findByUserUid } = require("../../models/user"); // 사용자 정보 가져오기

async function loginController(req, res) {
  const { userUid, password } = req.body;
  if (!userUid || !password)
    return res.status(400).json({ error: "이메일과 비밀번호가 필요합니다." });

  try {
    // 로그인 인증
    await userService.login(userUid, password);

    // 🔹 로그인 성공 시 세션에 사용자 정보 저장
    const user = await findByUserUid(userUid);

    // req.session.user 객체를 통해 로그인 상태 유지
    req.session.user = {
      userNo: user.userNo, // DB에서 가져온 고유 사용자 번호
      id: user.userUid, // 사용자 ID
      name: user.name, // 사용자 이름
    };

    return res.json({ message: "로그인 성공", user: req.session.user });
  } catch (err) {
    return res.status(401).json({ error: err.message });
  }
}

module.exports = loginController;
