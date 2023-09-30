import { Problem } from "../schemas/problem.schema.js";
import { getData } from "../utils/problemData.js";

const findProblems = async () => {
  const res = await Problem.find();

  return res;
};

const findProblem = async (_id) => {
  const res = await Problem.findOne({ _id });
  return res;
};

const createProblem = async (url) => {
  const problem = await getData(url);
  const res = await Problem.create(problem);
  return res;
};

const deleteProblem = async (_id) => {
  const res = await Problem.deleteOne({ _id });
  return res;
};

const updateProblem = async (_id, body) => {
  const res = await Problem.findOneAndUpdate({ _id }, body, {
    new: true,
  });
  return res;
};

export default {
  findProblems,
  findProblem,
  createProblem,
  deleteProblem,
  updateProblem,
};
