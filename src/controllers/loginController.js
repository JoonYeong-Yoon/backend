const userService = require("../services/userService");

module.exports = async function loginController(req, res) {
  const { userUid, password } = req.body;

  if (!userUid || !password)
    return res.status(400).json({ error: "이메일과 비밀번호가 필요합니다." });

  try {
    const result = await userService.login(userUid, password);
    res.json(result);
  } catch (err) {
    res.status(401).json({ error: err.message });
  }
};
