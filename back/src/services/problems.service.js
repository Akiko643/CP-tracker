import { Problem } from "../schemas/problem.schema.js";
import { getData } from "../utils/problemData.js";

const findProblems = async ({ userId, statusArray, minRating, maxRating }) => {
  // search query
  const problems = await Problem.find({ userId, status: { $in: statusArray } });
  // minRating / maxRating -> codeforces problems
  minRating = parseInt(minRating);
  maxRating = parseInt(maxRating);
  // filter by difficulty if the problem is from codeforces
  return problems.filter((problem) => {
    if (problem.source !== "codeforces.com" || problem.difficulty === "N/A")
      return false;
    // example problem.difficulty *800
    // removing the '*' and converting into an integer
    const difficulty = parseInt(problem.difficulty.substring(1));
    return minRating <= difficulty && difficulty <= maxRating;
  });
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
  const problem = Problem.findOne({ _id: problemId, userId });
  if (!problem) {
    throw new Error("Problem does not exist");
  }
  // NOT_SOLVED_STATE -> SOLVED_STATE
  // adding solvedDate field
  if (problem.status !== body.status && body.status === "Solved") {
    body.solvedDate = new Date();
  }
  // Updating the problem in the database
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
