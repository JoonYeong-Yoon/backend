// 이메일 형식 체크
function validateEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// 비밀번호 형식 체크
function validatePassword(password) {
  if (password.length < 8 || password.length > 16) {
    return "비밀번호는 8~16자리여야 합니다.";
  }
  if (!/[a-z]/.test(password)) {
    return "비밀번호에 소문자가 최소 1개 포함되어야 합니다.";
  }
  if (!/[A-Z]/.test(password)) {
    return "비밀번호에 대문자가 최소 1개 포함되어야 합니다.";
  }
  if (!/\d/.test(password)) {
    return "비밀번호에 숫자가 최소 1개 포함되어야 합니다.";
  }
  return null; // 통과
}

module.exports = { validateEmail, validatePassword };
