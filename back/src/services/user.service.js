import { User } from "../schemas/user.schema.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const hash = (password) => {
  const saltRounds = 10;
  const salt = bcrypt.genSaltSync(saltRounds);
  const passwordHash = bcrypt.hashSync(password, salt);
  return passwordHash;
};

export const generateToken = (payload) => {
  const token = jwt.sign({ ...payload._doc }, process.env.JWT_PRIVATE_KEY, {
    expiresIn: "1h",
  });
  return token;
};

const userFind = async ({ username, password }) => {
  const user = await User.findOne({ username });
  if (!user) {
    return new Error("Username does not exist");
  }
  const isPassTrue = bcrypt.compareSync(password, user.passwordHash);
  if (!isPassTrue) {
    return new Error("Wrong password");
  }
  return user;
};

const userGoogle = async ({ username, password }) => {
  const user = await User.findOne({ username });
  if (user) { // user signed up before
    return user;
  }
  return userCreate({ username, password });
} 

const userCreate = async ({ username, password }) => {
  const passwordHash = hash(password);
  const isExist = await User.findOne({ username }).exec();
  if (isExist !== null) {
    return "Username already exists";
  }
  const user = await User.create({ username, passwordHash });
  return user;
};

const userGenerateToken = async (name) => {
  const userEmail = await User.findOne({ email: name }).exec();
  if (userEmail) {
    return generateToken(userEmail);
  }
  const userCredentials = await User.findOne({ username: name }).exec();
  if (userCredentials) {
    return generateToken(userCredentials);
  }
  return new Error("invalid email or username");
}

// const deleteAll = async () => {
//   await User.deleteMany({});
// };

export default {
  userFind,
  userCreate,
  userGoogle,
  userGenerateToken
};
