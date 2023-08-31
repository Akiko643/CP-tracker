// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import {
    deleteOne,
    getProblem,
    updateOne,
} from "@lib/mongo/problem/problem.js";
import connectMongo from "@lib/mongo";
import { handleError } from "@lib/utils/error";

const handler = async (req, res) => {
    try {
        await connectMongo();
        const { id } = req.query;
        if (req.method === "GET") {
            const problem = await getProblem(id);
            return res.status(200).json({ problem });
        }

        if (req.method === "DELETE") {
            const response = await deleteOne(id);
            return res.status(200).json({ response });
        }

        if (req.method === "PATCH") {
            const { body } = req;
            const response = await updateOne(id, body);
            return res.status(200).json({ response });
        }
    } catch (err) {
        handleError(err, res);
    }
};

export default handler;
