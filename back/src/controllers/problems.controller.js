import ProblemService from "../services/problems.service.js";

export const findProblems = async (req, res) => {
  // return my problems
  try {
    const response = await ProblemService.findProblems();
    return res.send(response);
  } catch (err) {}
};

export const findProblem = async (req, res) => {
  // check my problem validation
  try {
    const { id } = req.params;
    const response = await ProblemService.findProblem(id);
    return res.send(response);
  } catch (err) {}
};

export const createProblem = async (req, res) => {
  // attach user id to it
  try {
    const { url } = req.body;
    const response = await ProblemService.createProblem(url);
    return res.send(response);
  } catch (err) {}
};

export const deleteProblem = async (req, res) => {
  // check my problem validation
  try {
    const { id } = req.params;
    const response = await ProblemService.deleteProblem(id);
    return res.send(response);
  } catch (err) {}
};

export const updateProblem = async (req, res) => {
  // check my problem validation
  try {
    const { id } = req.params;
    const { body } = req;
    const response = await ProblemService.updateProblem(id, body);
    return res.send(response);
  } catch (err) {}
};
