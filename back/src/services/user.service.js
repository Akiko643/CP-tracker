import { User } from "../schemas/user.schema.js";
import crypto from "crypto";

const hash = (password) => {
  const passwordHash = crypto.createHash("sha256");
  passwordHash.update(password);
  return passwordHash.digest("hex");
};

const findUser = async (email, password) => {
  const passwordHash = hash(password);
  const user = await User.findOne({ email, passwordHash });
  return user;
};

const createUser = async (email, password) => {
  const passwordHash = hash(password);
  const user = await User.create({ email, passwordHash });
  return user;
};

const deleteAll = async () => {
  await User.deleteMany({});
};

export default {
  findUser,
  createUser,
  deleteAll,
};
