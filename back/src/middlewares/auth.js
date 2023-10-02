import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
  try {
    const token = req.header("authorization").split(" ")[1];
    const user = jwt.verify(token, process.env.JWT_PRIVATE_KEY);
    req.user = user;
    next();
  } catch (err) {
    return res.status(401).json({ message: err.message });
  }
};
