function authMiddleware(req, res, next) {
  console.log(req.session);
  if (!req.session.user) {
    return res.status(401).json({ error: "로그인이 필요합니다." });
  }
  next();
}

module.exports = authMiddleware;
