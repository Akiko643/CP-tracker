import UserService from "../services/user.service.js";
import jwt from "jsonwebtoken";

export const createToken = (payload) => {
  const token = jwt.sign({ ...payload._doc }, process.env.JWT_PRIVATE_KEY, {
    expiresIn: "1h",
  });
  return token;
};

export const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await UserService.findUser(username, password);
    if (!user) {
      throw new Error("User not found");
    }
    const token = createToken(user);
    return res.send({ user, token });
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
};

export const signUp = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await UserService.createUser(username, password);
    const token = createToken(user);
    return res.send({ user, token });
  } catch (err) {
    console.log(err);
    return res.status(400).json({ message: err.message });
  }
};
