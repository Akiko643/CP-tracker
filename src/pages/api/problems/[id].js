// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { deleteOne, getProblem } from "@lib/mongo/problem/problem.js";
import connectMongo from "@lib/mongo";

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
    } catch (err) {
        res.send(err);
    }
};

export default handler;
