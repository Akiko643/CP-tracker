import { Problem } from "./problem.schema";
import { getData } from "@lib/utils/urlHandler";

export const getProblems = async () => {
    const res = await Problem.find();
    return res;
};

export const getProblem = async (_id) => {
    const res = await Problem.findOne({ _id });
    return res;
};

export const addProblem = async (url) => {
    const problem = await getData(url);
    const res = await Problem.create(problem);
    return res;
};

export const deleteAll = async () => {
    const res = await Problem.deleteMany({});
    return res;
};

export const deleteOne = async (_id) => {
    const res = await Problem.deleteOne({ _id });
    return res;
};

export const updateOne = async (_id, body) => {
    const res = await Problem.findOneAndUpdate({ _id }, body, {
        new: true,
    });
    return res;
};
