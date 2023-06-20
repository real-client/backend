import jwt from "jsonwebtoken";

const config = process.env;

const verifyToken = (req, res, next) => {
  const token = req.cookies["token"];

  if (!token) {
    return res.status(403).send("A token is required");
  }
  try {
    const decoded = jwt.verify(token, config.ADMIN_TOKEN_KEY);
    req.user = decoded;
  } catch (err) {
    return res.status(401).send("Invalid Token");
  }
  return next();
};

export default verifyToken;
