import { Problem } from "../schemas/problem.schema.js";
import { User } from "../schemas/user.schema.js";
import { getData } from "../utils/problemData.js";

const findProblems = async ({ userId, statusArray, minRating, maxRating }) => {
  try {
    // search query
    const problems = await Problem.find({
      userId,
      status: { $in: statusArray },
    });
    // minRating / maxRating -> codeforces problems
    minRating = parseInt(minRating);
    maxRating = parseInt(maxRating);
    // filter by difficulty if the problem is from codeforces
    return problems.filter((problem) => {
      if (problem.difficulty === "N/A") return true;
      const difficulty = parseInt(problem.difficulty);
      return minRating <= difficulty && difficulty <= maxRating;
    });
  } catch (err) {
    if (err instanceof Error) {
      console.log("ERROR findProblems: " + err.message);
    } else {
      console.log("ERROR findProblems: " + err);
    }
  }
};

const findProblem = async ({ userId, problemId }) => {
  const res = await Problem.findOne({ _id: problemId, userId });
  if (!res) {
    throw new Error("User don't have the problem");
  }
  return res;
};

const createProblem = async ({ userId, url }) => {
  try {
    const problem = await getData(url);
    const res = await Problem.create({ ...problem, userId });
    console.log(`createProblem: ${url}`);
    return res;
  } catch (err) {
    if (err instanceof Error) {
      console.log("ERROR createProblem: " + err.message);
    } else {
      console.log("ERROR createProblem: " + err);
    }
  }
};

const deleteProblem = async ({ userId, problemId }) => {
  const res = await Problem.deleteOne({ _id: problemId, userId });
  return res;
};

const updateProblem = async ({ userId, problemId, body }) => {
  const problem = await Problem.findOne({ _id: problemId, userId });
  if (!problem) {
    throw new Error("Problem does not exist");
  }
  //
  const duration = body.timeTotal - problem.timeTotal;
  let addProblem = 0;
  // NOT_SOLVED_STATE -> SOLVED_STATE (adding solvedDate field)
  if (problem.status !== body.status && body.status === "Solved") {
    body.solvedDate = new Date();
    addProblem = 1;
  }
  // spend time on this
  if (duration > 0) {
    const user = await User.findOne({ _id: userId });
    // eachDay
    const indexDay = user.eachDay.length;
    const date = new Date();
    if (
      indexDay === 0 ||
      !isEqualDates(user.eachDay[indexDay - 1].date, new Date())
    ) {
      // adding new date
      user.eachDay.push({
        date: date,
        time: duration,
        numOfProblems: addProblem,
      });
    } else {
      // updating last date
      user.eachDay[indexDay - 1].time += duration;
      user.eachDay[indexDay - 1].numOfProblems += addProblem;
    }
    // eachMonth
    const indexMonth = user.eachMonth.length - 1;
    if (
      indexMonth === -1 ||
      user.eachMonth[indexMonth].year !== date.getFullYear() ||
      user.eachMonth[indexMonth].month !== date.getMonth()
    ) {
      user.eachMonth.push({
        year: date.getFullYear(),
        month: date.getMonth(),
        time: duration,
        numOfProblems: addProblem,
      });
    } else {
      user.eachMonth[indexMonth].time += duration;
      user.eachMonth[indexMonth].numOfProblems += addProblem;
    }
    await User.findOneAndUpdate({ _id: userId }, user);
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

export const isEqualDates = (date1, date2) => {
  return (
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate()
  );
};

export default {
  findProblems,
  findProblem,
  createProblem,
  deleteProblem,
  updateProblem,
};
