const httpStatusCodes = require('../utils/constants');

class Unauthorized extends Error {
  constructor(message) {
    super(message);
    this.statusCode = httpStatusCodes.unauthorized.code;
  }
}

module.exports = Unauthorized;
