const { validateToken } = require("../config/token");

function validateAuth(req, res, next) {
  const token = req.cookies.token;
  if (!token) return res.sendStatus(401);

  const { client } = validateToken(token);
  if (!client) return res.sendStatus(401);

  req.client = client;

  next();
}

module.exports = { validateAuth };
