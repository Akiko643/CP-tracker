import { generateToken } from "@lib/authSession";
import { User } from "./user.schema";
import crypto from "crypto";

export const hash = (password) => {
    const passwordHash = crypto.createHash("sha256");
    passwordHash.update(password);
    return passwordHash.digest("hex");
};

export const getUserLean = async (filter) => {
    const user = await User.findOne(filter).lean();
    return user;
};

export const createUser = async (body) => {
    const user = await User.create(body);
    return user;
};

export const deleteUser = async (_id) => {
    const res = await User.deleteOne({ _id });
    return res;
};

export const updateUser = async (_id, body) => {
    const user = await User.findOneAndUpdate({ _id }, body, { new: true });
    return user;
};

export const login = async ({ username, password }) => {
    const passwordHash = hash(password);
    const user = await getUserLean({ username, passwordHash });
    if (!user) {
        throw new Error("User not found");
    }
    const token = await generateToken(user);
    return token;
};

export const signUp = async ({ username, password, passwordRepeat }) => {
    if (password !== passwordRepeat) {
        throw new Error("Password does not match!");
    }

    const userInDb = await getUserLean({ username });
    if (userInDb) {
        throw new Error("Username is not available!");
    }

    const passwordHash = hash(password);

    await createUser({ username, passwordHash });
    const user = await getUserLean({ username, passwordHash });

    const token = await generateToken(user);
    return token;
};
