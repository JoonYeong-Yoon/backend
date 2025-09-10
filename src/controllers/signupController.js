const userService = require("../services/userService");

module.exports = async function signupController(req, res) {
  const { userUid, password, name, mobile } = req.body;
  const phoneNumber = mobile; // DB 컬럼명과 매핑

  // 필수 값 체크
  if (!userUid)
    return res.status(400).json({ error: "이메일을 입력해주세요." });
  if (!password)
    return res.status(400).json({ error: "비밀번호를 입력해주세요." });
  if (!name) return res.status(400).json({ error: "이름을 입력해주세요." });
  if (!phoneNumber)
    return res.status(400).json({ error: "전화번호를 입력해주세요." });

  // 이메일 형식 체크
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(userUid))
    return res
      .status(400)
      .json({ error: "유효한 이메일 주소를 입력해주세요." });

  // 비밀번호 복잡도 체크
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,16}$/;
  if (!passwordRegex.test(password))
    return res.status(400).json({
      error: "비밀번호는 8~16자리, 대문자·소문자·숫자를 모두 포함해야 합니다.",
    });

  try {
    const result = await userService.signup(
      userUid,
      password,
      name,
      phoneNumber
    );
    res.json(result);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
