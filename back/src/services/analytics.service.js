import { Problem } from "../schemas/problem.schema.js";

async function lastDays(userId, cnt) {
  const ret = [];
  const allProblems = await Problem.find({
    userId,
  });

  for (let i = cnt - 1; i >= 0; i--) {
    const thatDay = new Date();
    thatDay.setDate(thatDay.getDate() - i);
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
    //
    for (let j = 0; j < allProblems.length; j++) {}
  }

  for (let i = cnt - 1; i >= 0; i--) {
    let thatDay = new Date();
    thatDay.setDate(thatDay.getDate() - i);
    //
    const problems = await Problem.find({
      userId,
      solvedDate: {
        $gte: startOfDay,
        $lte: endOfDay,
      },
    });
    const numOfProblems = problems.length;
    const totalDurationMins = (
      problems.reduce((acc, curr) => acc + curr.timeTotal, 0) / 60000
    ).toFixed(2);
    ret.push({
      numOfProblems,
      totalDurationMins,
      date: {
        year: thatDay.getFullYear(),
        month: thatDay.getMonth(),
        day: thatDay.getDate(),
        dayOfTheWeek: thatDay.getDay(),
      },
    });
  }
  return ret;
}

const findAnalyticsTimeBar = async ({ userId, timespan }) => {
  // timespan -> week / month / year / all
  // response: TOTAL minute, number of solved problems
  // week -> (last 7 days) each day
  // month -> (last 30 days) each day
  // year -> (last 12 months) each month
  if (timespan === "week") {
    return await lastDays(userId, 7);
  } else if (timespan === "month") {
    return await lastDays(userId, 30);
  } else if (timespan === "year") {
  }
  return [];
};

export default {
  findAnalyticsTimeBar,
};
