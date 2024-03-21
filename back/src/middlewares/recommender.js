import { User } from "../schemas/user.schema.js";

export const getLastIndex = async (req, res, next) => {
  try {
    const { user } = req;
    const { _id } = user;

    const userdb = await User.findOne({ _id });
    req.lastRecommendIndex = userdb.lastRecommendIndex;
    next();
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
};
