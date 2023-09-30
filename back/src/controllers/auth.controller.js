import UserService from "../services/user.service.js";

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await UserService.findUser(email, password);
    if (!user) {
      throw new Error("User not found");
    }

    return res.send(user);
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
};

export const signUp = async (req, res) => {
  try {
    const { email, password, passwordRepeat } = req.body;
    if (password !== passwordRepeat) {
      throw new Error("Password is not match with passwordRepeat.");
    }

    const user = await UserService.createUser(email, password);
    return res.send(user);
  } catch (err) {
    console.log(err);
    return res.status(400).json({ message: err.message });
  }
};
