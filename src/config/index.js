module.exports = {
  FRONT_PORT: 3000,
  BACKEND_PORT: 5000,
  DB_CONFIG: {
    host: "192.168.0.55",
    port: 3307,
    user: "root",
    password: "test",
    database: "univDB",
    waitForConnections: true,
    connectionLimit: 20,
    acquireTimeout: 5000, // 10초 후에 커넥션을 끊도록 설정
    connectTimeout: 5000,
  },
};
