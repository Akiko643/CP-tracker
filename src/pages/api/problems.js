// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import {
  addProblem,
  deleteAll,
  getProblems,
} from "@lib/mongo/problem/problem.js";
import connectMongo from "@lib/mongo";
import { handleError } from "@lib/utils/error";

const handler = async (req, res) => {
  try {
    await connectMongo();
    if (req.method === "GET") {
      const problems = await getProblems();
      return res.status(200).json({ size: problems.length, problems });
    }

    if (req.method === "POST") {
      const { url } = req.body;
      const problem = await addProblem(url);
      return res.status(200).json({ problem });
    }

    if (req.method === "DELETE") {
      const response = await deleteAll();
      return res.status(200).json(response);
    }
  } catch (err) {
    handleError(err, res);
  }
};

export default handler;
