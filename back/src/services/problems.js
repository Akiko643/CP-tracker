// import { Problem } from "./problem.schema";
// import { getData } from "@lib/utils/urlHandler";

const getProblems = async () => {
  // const res = await Problem.find();

  return "res";
};

const getProblem = async (_id) => {
  const res = await Problem.findOne({ _id });
  return res;
};

const addProblem = async (url) => {
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
  getProblems,
  getProblem,
  addProblem,
  deleteProblem,
  updateProblem,
};
