import UserService from "../services/user.service.js";
import jwt from "jsonwebtoken";

export const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await UserService.userFind({ username, password });
    return res.status(200).send(user);
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
};

export const loginGoogle = async (req, res) => {
  try {
    const userGoogle = req.body;
    const userEmail = userGoogle.email;
    const userId = userGoogle.id;
    const user = await UserService.userGoogle({ userEmail, userId });
    return res.status(200).send(user);
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
}

export const signUp = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await UserService.userCreate({ username, password });
    return res.status(200).send(user);
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
};

export const generateToken = async (req, res) => {
  try {
    const { name } = req.body;
    const token = await UserService.userGenerateToken(name);
    res.json({ token });
    return res.status(200);
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
}