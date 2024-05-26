import RecommendService from "../services/recommender.service.js";

export const recommendProblem = async (req, res) => {
  try {
    const { user, lastRecommendIndex } = req;
    const { tags, rating } = req.query;

    const problems = await RecommendService.recommendProblem({
      userId: user._id,
      lastRecommendIndex: lastRecommendIndex,
      tags: tags || "",
      rating: rating || "0;3500",
    });
    return res.send(problems);
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
};
