import { Problem } from "../mongo/problem/problem.schema";
import jsdom from "jsdom";
import axios from "axios";

const codeforces = (html) => {
    const dom = new JSDOM(html);
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

    return problem;
};

// add cses

export const getData = async (url) => {
    const source = url.split("/")[2];
    const { data } = await axios.get(url);
    switch (source) {
        case "codeforces.com":
            return codeforces(data);

        case "cses.fi":

        default:
            break;
    }
};
