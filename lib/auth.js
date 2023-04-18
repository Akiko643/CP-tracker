import jwt from "jsonwebtoken";
import crypto from "crypto";
import { User } from "./mongo/user/user.schema";

const hash = (password) => {
    const passwordHash = crypto.createHash("sha256");
    passwordHash.update(password);
    return passwordHash.digest("hex");
};

const getSecretKey = () => {
    const secret = process.env.PRIVATE_KEY;
    if (!secret || secret.length === 0) {
        throw new Error("The environment variable PRIVATE_KEY is not set.");
    }

    return secret;
};

const generateToken = (user) => {
    const { passwordHash: pass, ...payload } = user;
    const privateKey = getSecretKey();

    const token = jwt.sign(payload, privateKey, {
        expiresIn: "30d",
    });
    return token;
};

export const verifyToken = (token) => {
    const privateKey = getSecretKey();
    const decoded = jwt.verify(token, privateKey);
    return decoded;
};

export const login = async ({ username, password }) => {
    const passwordHash = hash(password);
    const user = await User.findOne({ username, passwordHash }).lean();
    if (!user) {
        throw new Error("User not found");
    }
    const token = generateToken(user);
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

    await User.create({ username, passwordHash });
    const user = await User.findOne({ username, passwordHash }).lean();

    const token = generateToken(user);
    return token;
};
