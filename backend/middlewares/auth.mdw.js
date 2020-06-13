const jwt = require('jsonwebtoken');
const createError = require('http-errors');

module.exports = function (req, res, next) {
  const token = req.headers['x-access-token'];
  if (token) {
    jwt.verify(token, "findKids", function (err, payload) {
      if (err)
        throw createError(401, err);

      // console.log(payload);
      req.tokenPayload = payload;
      next();
    })
  } else {
    throw createError(401, 'No accessToken found.');
  }
}
