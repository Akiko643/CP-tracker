import axios from "axios";
import { Problem } from "./problem.schema";
import jsdom from "jsdom";

const { JSDOM } = jsdom;

export const getProblems = async () => {
    const res = await Problem.find();
    return res;
};

export const getProblem = async (_id) => {
    const res = await Problem.findOne({ _id });
    return res;
};

export const addProblem = async (url) => {
    const source = url.split("/")[2];
    const { data } = await axios.get(url);
    const dom = new JSDOM(data);
    const document = dom.window.document;
    const title = document.getElementsByClassName("title")[0].innerHTML;
    const htmlCollection = document.getElementsByClassName("tag-box");
    const difficulty = [...htmlCollection]
        .find((el) => el.title === "Difficulty")
        ?.innerHTML.trim();

    const tags = [...htmlCollection]
        .filter((tag) => tag.title !== "Difficulty")
        .map((tag) => tag.innerHTML.trim());

    const problem = {
        url,
        title,
        source,
        tags,
        difficulty,
    };

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
