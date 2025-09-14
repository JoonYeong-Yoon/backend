// 외부 라이브러리 불러오기
const cors = require("cors"); // CORS 설정용
const cookieParser = require("cookie-parser"); // 쿠키 파싱용
const session = require("express-session"); // 세션 관리용
const config = require("../config"); // 환경 설정 (포트, 세션 등)

// ----------------- CORS -----------------
const corsMiddleware = cors({
  // 허용할 origin 주소 (프론트엔드 서버)
  origin: [`http://localhost:${config.FRONT_PORT}`],
  // 클라이언트 요청 시 쿠키 전달 허용
  credentials: true,
});

// ----------------- 세션 -----------------
const sessionMiddleware = session(config.SESSION); // config.SESSION에 정의된 세션 옵션 사용

// ----------------- Export -----------------
module.exports = {
  jsonMiddleware: require("express").json(),
  corsMiddleware,
  cookieMiddleware: cookieParser(),
  sessionMiddleware,
};
