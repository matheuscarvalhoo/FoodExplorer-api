const { verify } = require('jsonwebtoken');
const AppError = require('../utils/AppError');

module.exports = (request, response, next) => {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new AppError('JWT token is missing', 401);
  }

  const [, token] = authHeader.split(' ');

  try {
    const decoded = verify(token, process.env.JWT_SECRET);

    request.user = {
      id: decoded.sub,
    };

    return next();
  } catch {
    throw new AppError('Invalid JWT token', 401);
  }
};
