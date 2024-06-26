import ProblemService from "../services/problems.service.js";

export const findProblems = async (req, res) => {
  try {
    const { user } = req;
    // status
    let statusArray = [];
    if (req.query.status !== undefined && req.query.status.length !== 0) {
      const statusString = req.query.status;
      statusArray = statusString.split(",");
    } else {
      statusArray = ["Todo", "Solving", "Skipped", "Solved"];
    }
    // minRating & maxRating
    const maxRating = req.query.maxRating || "9999";
    const minRating = req.query.minRating || "0";
    //
    const response = await ProblemService.findProblems({
      userId: user._id,
      statusArray,
      minRating,
      maxRating,
    });
    return res.send(response);
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
};

export const findProblem = async (req, res) => {
  // check my problem validation
  try {
    const { user } = req;
    const { id } = req.params;
    const response = await ProblemService.findProblem({
      userId: user._id,
      problemId: id,
    });
    return res.send(response);
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
};

export const createProblem = async (req, res) => {
  // attach user id to it
  try {
    const { user } = req;
    const { url } = req.body;
    const response = await ProblemService.createProblem({
      userId: user._id,
      url,
    });
    return res.send(response);
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
};

export const deleteProblem = async (req, res) => {
  // check my problem validation
  try {
    const { user } = req;
    const { id } = req.params;
    const response = await ProblemService.deleteProblem({
      userId: user._id,
      problemId: id,
    });
    return res.send(response);
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
};

export const updateProblem = async (req, res) => {
  // check my problem validation
  try {
    const { user, body } = req;
    const { id } = req.params;
    const {
      status,
      metaCognition,
      takeaways,
      analysis,
      timeTotal,
      tags,
      solvedDate,
    } = body;

    const updateBody = {
      status,
      metaCognition,
      takeaways,
      analysis,
      timeTotal,
      tags,
      solvedDate,
    };

    const response = await ProblemService.updateProblem({
      userId: user._id,
      problemId: id,
      body: updateBody,
    });
    return res.send(response);
  } catch (err) {
    // send error
    return res.status(400).json({ message: err.message });
  }
};
