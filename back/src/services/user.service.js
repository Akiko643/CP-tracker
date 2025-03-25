import { User } from "../schemas/user.schema.js";

/* no longer storing user password in the db */
// const hash = (password) => {
//   const saltRounds = 10;
//   const salt = bcrypt.genSaltSync(saltRounds);
//   const passwordHash = bcrypt.hashSync(password, salt);
//   return passwordHash;
// };

const findUser = async ({ email }) => {
  const user = await User.findOne({ email });
  if (!user) {
    return undefined;
  }
  return user;
};

const createUser = async ({ email }) => {
  const isExist = await User.findOne({ email }).exec();
  if (isExist) {
    throw new Error("Username already exists");
  }
  console.log("createUser: ", email);
  const user = await User.create({
    email,
    lastRecommendIndex: 0,
  });
  return user;
};

export default {
  findUser,
  createUser,
};
