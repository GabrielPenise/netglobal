const { validateToken } = require("../config/token");

function validateAuth(req, res, next) {
  const token = req.cookies.token;
  if (!token) return res.sendStatus(401);

  const { client } = validateToken(token);
  if (!client) return res.sendStatus(401);

  req.client = client;

  next();
}

function validateClient(req, res, next) {
  const token = req.cookies.token;
  if (!token) return res.sendStatus(401);

  const { client } = validateToken(token);
  if (!client) return res.sendStatus(401);
  if (client.super_admin || !client.cuit) return res.sendStatus(405);

  req.client = client;

  next();
}

function validateSuperAdmin(req, res, next) {
  const token = req.cookies.token;
  if (!token) return res.sendStatus(401);

  const { client } = validateToken(token);
  if (!client) return res.sendStatus(401);
  if (!client.super_admin) return res.sendStatus(405);

  req.client = client;

  next();
}

module.exports = { validateAuth, validateClient, validateSuperAdmin };
