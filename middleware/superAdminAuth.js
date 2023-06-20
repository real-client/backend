import jwt from "jsonwebtoken";

const config = process.env;

const verifySuperAdmin = (req, res, next) => {
  console.log(req.body.email, 33333333);

  return next();
};

export default verifySuperAdmin;
