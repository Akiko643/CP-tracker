import { User } from "../schemas/user.schema.js";
import bcrypt from "bcrypt";

const hash = (password) => {
  const saltRounds = 10;
  const salt = bcrypt.genSaltSync(saltRounds);
  const passwordHash = bcrypt.hashSync(password, salt);
  return passwordHash;
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

const userCreate = async ({ username, password }) => {
  const passwordHash = hash(password);
  const isExist = await User.findOne({ username }).exec();
  if (isExist !== null) {
    return "Username already exists";
  }
  const user = await User.create({ username, passwordHash });
  return user;
};

// const deleteAll = async () => {
//   await User.deleteMany({});
// };

export default {
  userFind,
  userCreate,
};
