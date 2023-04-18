import jwt from "jsonwebtoken";
import crypto from "crypto";
import { User } from "./user/user.schema";

const hash = (password) => {
  const passwordHash = crypto.createHash("sha256", password);
  return passwordHash.digest("hex");
};

export const login = async ({ username, password }) => {
  const passwordHash = hash(password);
  const user = await User.findOne({ username, passwordHash }).lean();
  if (!user) {
    throw new Error("User not found");
  }

  const { passwordHash: pass, ...payload } = user;
  const privateKey = process.env.PRIVATE_KEY;

  const token = jwt.sign(payload, privateKey, {
    expiresIn: "30d",
  });
  return token;
};

export const signUp = async ({ username, password, passwordRepeat }) => {
  if (password !== passwordRepeat) {
    throw new Error("Password does not match!");
  }

  const userInDb = await User.findOne({ username });
  if (userInDb) {
    throw new Error("Username is not available!");
  }

  const passwordHash = hash(password);
  const privateKey = process.env.PRIVATE_KEY;
  const newUser = {
    username,
    passwordHash,
  };
  await User.create(newUser);
  const user = await User.findOne(newUser).lean();
  const { passwordHash: pass, ...payload } = user;

  const token = jwt.sign(payload, privateKey, {
    expiresIn: "30d",
  });
  return token;
};
