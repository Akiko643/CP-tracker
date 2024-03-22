import { Problem } from "../schemas/problem.schema.js";
import { User } from "../schemas/user.schema.js";
import { isEqualDates } from "./problems.service.js";

async function lastDays(userId, cnt) {
  const ret = [];
  const user = await User.find({ _id: userId });
  if (!user) {
    throw new Error("User doesn't exist");
  }
  const index = user.eachDay.length - 1;
  for (let i = cnt - 1; i >= 0; i--) {
    const thatDay = new Date();
    thatDay.setDate(thatDay.getDate() - i);
    const date = {
      year: thatDay.getFullYear(),
      month: thatDay.getMonth(),
      day: thatDay.getDate(),
      dayOfTheWeek: thatDay.getDate(),
    };
    //
    if (index >= 0 && isEqualDates(thatDay, user.eachDay[index].date)) {
      // user has data on that day
      ret.push({
        numOfProblems: user.eachDay[index].numOfProblems,
        totalDurationMins: (user.eachDay[index].time / 60000).toFixed(2),
        date,
      });
      index--;
    } else {
      ret.push({
        numOfProblems: 0,
        totalDurationMins: 0,
        date,
      });
    }
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
