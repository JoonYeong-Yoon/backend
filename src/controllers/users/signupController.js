const userService = require("../../services/userService");
const { validateEmail, validatePassword } = require("../../utils/validators");

// 회원가입 요청 처리 컨트롤러
async function signupController(req, res) {
  const { userUid, password, name, mobile } = req.body;
  const phoneNumber = mobile; // 프론트엔드에서 받은 mobile 값을 phoneNumber로 통일

  // ----------------- 필수 값 체크 -----------------
  if (!userUid)
    return res.status(400).json({ error: "이메일을 입력해주세요." });
  if (!password)
    return res.status(400).json({ error: "비밀번호를 입력해주세요." });
  if (!name) return res.status(400).json({ error: "이름을 입력해주세요." });
  if (!phoneNumber)
    return res.status(400).json({ error: "전화번호를 입력해주세요." });

  // ----------------- 이메일 형식 체크 -----------------
  if (!validateEmail(userUid)) {
    return res
      .status(400)
      .json({ error: "유효한 이메일 주소를 입력해주세요." });
  }

  // ----------------- 비밀번호 형식 체크 -----------------
  const passwordError = validatePassword(password);
  if (passwordError) {
    return res.status(400).json({ error: passwordError });
  }

  // ----------------- 회원가입 처리 -----------------
  try {
    // userService.signup에서 DB 저장 및 해시 비밀번호 처리
    const result = await userService.signup(
      userUid,
      password,
      name,
      phoneNumber
    );
    // 성공 시 메시지 반환
    res.status(201).json(result);
  } catch (err) {
    // 이미 존재하는 사용자 등 오류 발생 시 400 Bad Request 반환
    res.status(400).json({ error: err.message });
  }
}

module.exports = signupController;
