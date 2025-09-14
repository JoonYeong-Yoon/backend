module.exports = {
  secret: "my-secret",

  // 세션을 항상 저장할지 여부
  // false → 세션에 변화가 없으면 저장하지 않음 (성능 최적화)
  resave: false,

  // 초기화되지 않은 세션을 저장할지 여부
  // false → 로그인 등 실제 데이터가 들어가기 전까지 저장하지 않음
  saveUninitialized: false,
  cookie: {
    maxAge: 2 * 60 * 60 * 1000, // 2시간 유지
    httpOnly: true, // 자바스크립트에서 쿠키 접근 못하게 (보안 강화)
  },
};
