import { User } from "../schemas/user.schema.js";
import { codeforcesApi } from "../utils/codeforcresApi.js";

const updateUserRecommendIndex = async (userId, newRecommendIndex) => {
  await User.findByIdAndUpdate(userId, {
    $set: { lastRecommendIndex: newRecommendIndex },
  });
};

const problemIdFinder = (problem) => {
  return problem.contestId * 100 + problem.index.charCodeAt(0) - 65;
};

const recommendProblem = async ({
  userId,
  lastRecommendIndex,
  tags,
  rating,
}) => {
  console.log(rating);
  if (!rating) {
    throw new Error("Rating range undefined");
  }

  const ratingArray = rating.split(";").map((el) => parseInt(el));

  console.log(ratingArray);
  if (ratingArray.length !== 2 || ratingArray[0] > ratingArray[1]) {
    throw new Error("Rating range invalid");
  }

  const problems = await codeforcesApi(tags, ratingArray);
  if (problems.length === 0) {
    throw new Error("No problem fit selected criteria");
  }

  let selectedProblem = problems.find(
    (problem) => problemIdFinder(problem) < lastRecommendIndex
  );
  console.log(lastRecommendIndex, selectedProblem);

  if (selectedProblem === undefined) {
    selectedProblem = problems[0];
  }

  await updateUserRecommendIndex(userId, problemIdFinder(selectedProblem));
  return selectedProblem;
};

export default { recommendProblem };
