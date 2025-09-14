// dbConfig.js 파일에서 데이터베이스 설정을 불러옴
const dbConfig = require("./dbConfig");

// sessionConfig.js 파일에서 세션 설정을 불러옴
const sessionConfig = require("./sessionConfig");

// 애플리케이션 전체에서 사용할 환경 설정을 객체 형태로 내보냄
module.exports = {
  // 프론트엔드 서버가 실행될 포트 번호
  FRONT_PORT: 3000,

  // 백엔드 서버(Express 등)가 실행될 포트 번호
  BACKEND_PORT: 5000,

  // 데이터베이스(MySQL, PostgreSQL 등) 연결에 필요한 설정 정보
  DB_CONFIG: dbConfig,

  // 세션 관리에 필요한 설정 정보 (쿠키 옵션, 세션 저장소 등)
  SESSION: sessionConfig,
};
