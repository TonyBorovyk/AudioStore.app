const jwt = require('jsonwebtoken');

const verifyToken = (token, res) => {
  const claims = jwt.verify(token, process.env.JWT_SECRET);
  if (!claims) {
    return res.code(401).send({
      message: 'Unauthenticated',
      success: false,
    });
  }
  return claims;
};

module.exports = { verifyToken };
