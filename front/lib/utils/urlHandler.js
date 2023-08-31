import jsdom from "jsdom";
import axios from "axios";

const { JSDOM } = jsdom;

const problemSources = {
    codeforces: "codeforces.com",
    cses: "cses.fi",
};

const codeforces = (url, dom) => {
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
        source: problemSources.codeforces,
        tags,
        difficulty,
    };
    return problem;
};

const cses = (url, dom) => {
    const document = dom.window.document;
    const title = document.getElementsByTagName("h1")[0].innerHTML;
    console.log(title);

    const problem = {
        url,
        title,
        source: problemSources.cses,
    };
    //tags and difficulty ?
    return problem;
};

export const getData = async (url) => {
    const source = url.split("/")[2];
    const { data } = await axios.get(url);
    const dom = new JSDOM(data);

    switch (source) {
        case problemSources.codeforces:
            return codeforces(url, dom);

        case problemSources.cses:
            return cses(url, dom);
        default:
            break;
    }
};
