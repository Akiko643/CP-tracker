import { Problem } from "../schemas/problem.schema.js";
import { User } from "../schemas/user.schema.js";
import { codeforcesApi } from "../utils/codeforcresApi.js";

const updateUserRecommendIndex = async (userId, newRecommendIndex) => {
  await User.findByIdAndUpdate(userId, {
    $set: { lastRecommendIndex: newRecommendIndex },
  });
};

const problemIdGen = (problem) => {
  return problem.contestId * 100 + problem.index.charCodeAt(0) - 65;
};

const problemURLGen = (problem) => {
  return `https://codeforces.com/contest/${problem.contestId}/problem/${problem.index}`;
}

const recommendProblem = async ({
  userId,
  lastRecommendIndex,
  tags,
  rating,
}) => {
  if (!rating) {
    throw new Error("Rating range undefined");
  }

  const ratingArray = rating.split(";").map((el) => parseInt(el));

  if (ratingArray.length !== 2 || ratingArray[0] > ratingArray[1]) {
    throw new Error("Rating range invalid");
  }

  const problems = await codeforcesApi(tags, ratingArray);
  let selectedProblem;
  for (const problem of problems) {
    const url = problemURLGen(problem);
    const res = await Problem.findOne({ url, userId });
    if (res) {
      continue;
    }
    
    selectedProblem = problem;
    if (problemIdGen(problem) < lastRecommendIndex) {
      selectedProblem = problem;
      break;
    }
  }
  
  if (selectedProblem === undefined) {
    throw new Error("No problem fit selected criteria");
  }

  await updateUserRecommendIndex(userId, problemIdGen(selectedProblem));
  return selectedProblem;
};

export default { recommendProblem };
