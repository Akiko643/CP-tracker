import { Problem } from "../schemas/problem.schema.js";
import { getData } from "../utils/problemData.js";

const findProblems = async ({ userId, statusArray }) => {
  const res = await Problem.find({ userId, status: { $in: statusArray } });
  return res;
};

const findProblem = async ({ userId, problemId }) => {
  const res = await Problem.findOne({ _id: problemId, userId });
  if (!res) {
    throw new Error("User don't have the problem");
  }
  return res;
};

const createProblem = async ({ userId, url }) => {
  const problem = await getData(url);
  const res = await Problem.create({ ...problem, userId });
  return res;
};

const deleteProblem = async ({ userId, problemId }) => {
  const res = await Problem.deleteOne({ _id: problemId, userId });
  return res;
};

const updateProblem = async ({ userId, problemId, body }) => {
  const res = await Problem.findOneAndUpdate({ _id: problemId, userId }, body, {
    new: true,
  });
  if (!res) {
    throw new Error("User don't have the problem");
  }
  return res;
};

export default {
  findProblems,
  findProblem,
  createProblem,
  deleteProblem,
  updateProblem,
};
