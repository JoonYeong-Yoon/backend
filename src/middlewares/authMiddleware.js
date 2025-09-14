function authMiddleware(req, res, next) {
  console.log(req.session);
  if (!req.session.user) {
    return res.status(401).json({ error: "로그인이 필요합니다." });
  }
  next();
}

module.exports = authMiddleware;

// req.session.user 존재 여부 확인 → 로그인 체크

// 로그인 안 됐으면 401 반환, 됐으면 다음 처리로 진행

// Express 라우터에서 미들웨어로 사용 가능
