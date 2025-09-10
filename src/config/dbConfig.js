module.exports = {
  host: "192.168.0.55", // DB 서버 IP
  port: 3307, // DB 접속 포트
  user: "root", // DB 사용자 계정
  password: "test", // DB 비밀번호
  database: "univDB", // 사용할 데이터베이스 이름
  waitForConnections: true, // 커넥션 풀이 다 찼을 때 대기 여부 (true = 대기)
  connectionLimit: 20, // 동시에 최대 20개의 커넥션만 유지
  acquireTimeout: 5000, // 커넥션 풀에서 커넥션을 가져오기 위해 기다리는 최대 시간 (5초)
  connectTimeout: 5000, // DB 서버에 접속 시도 후 기다리는 최대 시간 (5초)
};
