import axios from "axios";

export const codeforcesApi = async (tags, rating) => {
  let url = "https://codeforces.com/api/problemset.problems?tags=" + tags;

  try {
    let problems = (await axios.get(url)).data.result.problems;
    return problems.filter(
      (problem) =>
        "rating" in problem &&
        problem.rating >= rating[0] &&
        problem.rating <= rating[1]
    );
  } catch (err) {
    return err;
  }
};
