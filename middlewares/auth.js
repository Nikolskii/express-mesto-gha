const jwt = require('jsonwebtoken');
const httpStatusCodes = require('../utils/constants');
const UnauthorizedError = require('../errors/unauthorized-err');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  try {
    if (!authorization || !authorization.startsWith('Bearer ')) {
      throw new UnauthorizedError(
        httpStatusCodes.unauthorized.messages.incorrectToken,
      );
    }
  } catch (e) {
    next(e);
  }

  const token = authorization.replace('Bearer ', '');

  let payload;

  try {
    payload = jwt.verify(token, 'some-secret-key');
  } catch (e) {
    next(e);
  }

  req.user = payload;

  next();
};
