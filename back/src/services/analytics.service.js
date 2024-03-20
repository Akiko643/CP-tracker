import { Problem } from "../schemas/problem.schema.js";

const findAnalyticsTimeBar = async ({ userId, timespan }) => {
  // timespan -> week / month / year / all
  // response: TOTAL minute, number of solved problems
  // week -> (last 7 days) each day
  // month -> (30 days) each day
  // year -> (12 months) each month
  const res = [];
  if (timespan == "week") {
    for (let i = 6; i >= 0; i--) {
      let thatDay = new Date();
      thatDay.setDate(thatDay.getDate() - i);
      //
      const startOfDay = new Date(
        thatDay.getFullYear(),
        thatDay.getMonth(),
        thatDay.getDate(),
        0,
        0,
        0
      );
      const endOfDay = new Date(
        thatDay.getFullYear(),
        thatDay.getMonth(),
        thatDay.getDate(),
        23,
        59,
        59
      );
      const problems = await Problem.find({
        solvedDate: {
          $gte: startOfDay,
          $lte: endOfDay,
        },
      });
      const numOfProblems = problems.length;
      const totalDuration = problems.reduce(
        (acc, curr) => acc + curr.spentTime,
        0
      );
      res.push({
        numOfProblems,
        totalDuration,
        date: {
          year: thatDay.getFullYear(),
          month: thatDay.getMonth(),
          day: thatDay.getDate(),
          dayOfTheWeek: thatDay.getDay(),
        },
      });
    }
  }
  return res;
};

export default {
  findAnalyticsTimeBar,
};
