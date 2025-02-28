import jsdom from "jsdom";
import fs from "fs";

const { JSDOM } = jsdom;

const problemSources = {
  codeforces: "codeforces.com",
  cses: "cses.fi",
};

const codeforces = (url, dom) => {
  const document = dom.window.document;
  const params = url.split("/");
  const contestName = params[params.length - 2];
  const title =
    contestName + document.getElementsByClassName("title")[0].innerHTML;
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
    source: problemSources.codeforces,
    tags,
    difficulty,
  };
  return problem;
};

const cses = (url, dom) => {
  const document = dom.window.document;
  const title = document.getElementsByTagName("h1")[0].innerHTML;

  const problem = {
    url,
    title,
    source: problemSources.cses,
  };
  //tags and difficulty ?
  return problem;
};

export const getData = async (url) => {
  try {
    // retrieving contestId and problemIndex from URL
    const source = url.split("/");
    const contestId = parseInt(source[source.length - 2]);
    const problemIndex = await source[source.length - 1];
    // get all problems from data.json
    const allProblems = await JSON.parse(
      fs.readFileSync("./data.json", "utf8")
    );
    // find problem
    const problem = await allProblems.find(
      (p) => p.contestId === contestId && p.index === problemIndex
    );
    if (!problem) {
      throw new Error("Proglem not found");
    }
    // format the response
    const res = {
      url: url,
      title: problem.name,
      source: problemSources.codeforces,
      tags: problem.tags,
      difficulty: problem.rating,
    };
    return res;
  } catch (err) {
    console.log(err);
    return err;
  }
};
