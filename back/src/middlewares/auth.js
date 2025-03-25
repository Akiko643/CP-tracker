import { jwtVerify } from "jose";
import { User } from "../schemas/user.schema.js";

export const verifyToken = async (req, res, next) => {
  try {
    const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    const token = req.header("authorization").split(" ")[1];
    const user = await jwtVerify(token, secret);
    // console.log(user);
    // user is JWT token that is an object
    // 'payload' and 'protectedHeader'.
    // payload contains email
    const dbUser = await User.findOne({ email: user.payload.email });
    if (!dbUser) {
      throw new Error("Authorization error");
    }
    req.user = dbUser;
    next();
  } catch (err) {
    return res.status(401).json({ message: err.message });
  }
};
