import connectMongo from "@lib/mongo";
import { signUp } from "@lib/auth";
import { handleError } from "@lib/utils/error";

const handler = async (req, res) => {
    try {
        if (req.method === "POST") {
            await connectMongo();
            const { username, password, passwordRepeat } = req.body;
            const token = await signUp({ username, password, passwordRepeat });
            return res.status(200).json({ token });
        }
    } catch (err) {
        handleError(err, res);
    }
};

export default handler;
