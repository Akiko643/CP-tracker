import ProblemService from "../services/problems.service.js";

export const findProblems = async (req, res) => {
  // return my problems
  try {
    const { user } = req;
    const response = await ProblemService.findProblems({ userId: user._id });
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
      tags,
      spentTime,
      startDate,
      solvedDate,
    } = body;

    const updateBody = {
      spentTime,
      status,
      metaCognition,
      takeaways,
      analysis,
      tags,
    };

    if (status === "Solved") {
      if (!solvedDate)
        throw new Error(`solvedDate is null while status is "Solved"`);

      updateBody.solvedDate = solvedDate;
    }

    if (status === "Solving") {
      if (!startDate)
        throw new Error(`startDate is null while status is "Solving"`);

      updateBody.startDate = startDate;
    }

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
