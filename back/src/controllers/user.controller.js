import UserService from "../services/user.service.js";

// the purpose of this function is to create a user, if doesn't exist
// it has no auth purpose
export const login = async (req, res) => {
  try {
    const email = req.body.email;
    const user = await UserService.findUser({ email });
    console.log(user);
    if (!user) {
      // creating a user in the db, if doesn't exist
      await UserService.createUser({ email });
    }
    console.log(`User successfully logged in: ${email}`);
    return res.status(200).send({ message: "Success" });
  } catch (err) {
    return res.status(400).send({ message: "error" });
  }
};

/* credential login no longer supported */
// export const signUp = async (req, res) => {
//   try {
//     const { username, password } = req.body;
//     let user = await UserService.createUser({ username, password });
//     const token = generateToken(user);
//     console.log(`Account successfully created: ${username}`);
//     return res.status(200).send({ ...user._doc, accessToken: token });
//   } catch (err) {
//     console.log(`Error in signing up: ${err.message}`);
//     return res.status(400).json({ message: err.message });
//   }
// };
