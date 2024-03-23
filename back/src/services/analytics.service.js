import { User } from "../schemas/user.schema.js";
import { isEqualDates } from "./problems.service.js";

async function lastDays(user, numOfDays) {
  const ret = [];
  let index = user.eachDay.length - 1;
  for (let i = 0; i < numOfDays; i++) {
    const day = new Date();
    day.setDate(day.getDate() - i);
    const date = {
      year: day.getFullYear(),
      month: day.getMonth(),
      day: day.getDate(),
      dayOfTheWeek: day.getDay(),
    };
    //
    if (index >= 0 && isEqualDates(day, user.eachDay[index].date)) {
      // user has data on that day
      ret.push({
        numOfProblems: user.eachDay[index].numOfProblems,
        totalDurationMins: parseFloat(
          (user.eachDay[index].time / 6000).toFixed(1)
        ),
        date,
      });
      index--;
    } else {
      // user doesn't have data on that day
      ret.push({
        numOfProblems: 0,
        totalDurationMins: 0,
        date,
      });
    }
  }
  ret.reverse();
  return ret;
}

async function lastMonths(user, numOfMonths) {
  const ret = [];
  let index = user.eachMonth.length - 1;
  const today = new Date();
  let year = today.getFullYear();
  let month = today.getMonth();
  // January -> 0
  for (let i = 0; i < numOfMonths; i++) {
    let totalDurationMins = 0;
    let numOfProblems = 0;
    //
    while (index >= 0) {
      const userYear = user.eachMonth[index].year;
      const userMonth = user.eachMonth[index].month;
      if (userYear === year && userMonth === month) {
        totalDurationMins += user.eachMonth[index].time;
        numOfProblems += user.eachDay[index].numOfProblems;
        index--;
      } else {
        break;
      }
    }
    //
    ret.push({
      numOfProblems,
      totalDurationMins: parseFloat(totalDurationMins / 6000).toFixed(1),
      date: {
        year,
        month,
        day: undefined,
        dayOfTheWeek: undefined,
      },
    });
    if (month === 0) {
      month = 12;
      year--;
    } else {
      month--;
    }
  }
  ret.reverse();
  return ret;
}

const findAnalyticsTimeBar = async ({ userId, timespan }) => {
  const user = await User.findOne({ _id: userId });
  if (!user) {
    throw new Error("User doesn't exist");
  }
  // timespan -> week / month / year / all
  // response: TOTAL minute, number of solved problems
  // week -> (last 7 days) each day
  // month -> (last 30 days) each day
  // year -> (last 12 months) each month
  if (timespan === "week") {
    return await lastDays(user, 7);
  } else if (timespan === "month") {
    return await lastDays(user, 30);
  } else if (timespan === "year") {
    return await lastMonths(user, 12);
  }
  return [];
};

export default {
  findAnalyticsTimeBar,
};
