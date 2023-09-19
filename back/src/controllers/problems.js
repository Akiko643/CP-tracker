import ProblemService from "../../services/problems.js";

export const getProblems = async (req, res) => {
  // return all problems
  try {
    const response = await ProblemService.getProblems();
    return res.send(response);
  } catch (err) {}
};

export const addProblem = async (req, res) => {
  // add a problem
  try {
    const response = await ProblemService.addProblem(url);
    return res.send(response);
  } catch (err) {}
};

export const getProblem = async (req, res) => {
  // get the problem with id
  try {
    const { id } = req.query;
    const response = await ProblemService.getProblem(id);
    return res.send(response);
  } catch (err) {}
};

export const deleteProblem = async (req, res) => {
  // delete a problem with id
  try {
    const { id } = req.query;
    const response = await ProblemService.deleteProblem(id);
    return res.send(response);
  } catch (err) {}
};

export const updateProblem = async (req, res) => {
  // update the problem with id
  try {
    const { id } = req.query;
    const { body } = req;
    const response = await ProblemService.updateProblem(id, body);
    return res.send(response);
  } catch (err) {}
};
