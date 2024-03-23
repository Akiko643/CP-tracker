"use client";
import { postProblem, recommendProblem } from "@/api";
import { useState } from "react";
import { navigateToProblem } from "../recommender/actions";

interface CFProblem {
  contestId: number;
  index: string;
  name: string;
  type: string;
  points: number;
  rating: number;
  tags: string[];
}

const allTags = [
  "2-sat",
  "binary search",
  "bitmasks",
  "brute force",
  "chinese remainder theorem",
  "combinatorics",
  "constructive algorithms",
  "data structures",
  "dfs and similar",
  "divide and conquer",
  "dp",
  "dsu",
  "expression parsing",
  "fft",
  "flows",
  "games",
  "geometry",
  "graph matchings",
  "graphs",
  "greedy",
  "hashing",
  "implementation",
  "interactive",
  "math",
  "matrices",
  "meet-in-the-middle",
  "number theory",
  "probabilities",
  "schedules",
  "shortest paths",
  "sortings",
  "string suffix structures",
  "strings",
  "ternary search",
  "trees",
  "two pointers",
];

const XPill = ({ tag, tags, setTags }: { tag: string, tags: string[], setTags: Function }) => {
  return (
    <span
      className="select-none gap-1 flex justify-center items-center cursor-pointer rounded-full px-2 py-1 bg-primary-400 hover:bg-primary-500"
      onClick={() => {
        const index = tags.findIndex((selectedTag) => selectedTag === tag);

        if (index !== -1) {
          tags.splice(index, 1);
          setTags([...tags]);
        }
      }}
    >
      {tag}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        width="1em"
        height="1em"
        fill="currentColor"
        className="h-3.5 w-3.5 text-label-4 dark:text-dark-label-4 hover:text-label-3 dark:hover:text-dark-label-3"
      >
        <path
          fillRule="evenodd"
          d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm1.414-10l2.293-2.293a1 1 0 00-1.414-1.414L12 10.586 9.707 8.293a1 1 0 00-1.414 1.414L10.586 12l-2.293 2.293a1 1 0 101.414 1.414L12 13.414l2.293 2.293a1 1 0 001.414-1.414L13.414 12z"
          clipRule="evenodd"
        ></path>
      </svg>
    </span>
  );
};

const Pill = ({ tag, tags, setTags }: { tag: string, tags: string[], setTags: Function }) => {
  return (
    <span
      className={`transition-colors duration-300 select-none cursor-pointer rounded-full px-3 py-1 ${tags.includes(tag)
        ? "bg-teal-900 hover:bg-teal-800"
        : "bg-primary-400 hover:bg-primary-500"
        }`}
      onMouseDown={() => {
        const index = tags.findIndex(
          (selectedTag) => selectedTag === tag
        );

        if (index === -1) {
          setTags([...tags, tag]);
        } else {
          tags.splice(index, 1);
          setTags([...tags]);
        }
      }}
    >
      {tag}
    </span>
  )
}

const Filter = ({ tags, setTags, setMinRating, setMaxRating }: { tags: string[], setTags: Function, setMinRating: Function, setMaxRating: Function }) => {
  const [tagsPopup, setTagsPopup] = useState<number>(0);
  const [tagsSearch, setTagsSearch] = useState<string>("");
  const inSearch = (text: string): boolean => {
    if (tagsSearch.length === 0) {
      return true;
    }

    const minlen = Math.min(text.length, tagsSearch.length);
    return tagsSearch.slice(0, minlen) === text.slice(0, minlen);
  };


  const SelectedTags = () => {
    return (
      <div className="flex flex-wrap gap-1 text-xs">
        {tags.map((tag, index) => (
          <XPill tag={tag} tags={tags} setTags={setTags} key={index} />
        ))}
      </div>
    )
  }

  return (
    <section className="flex mb-4">
      <div className="w-1/2">
        <p>Tags</p>
        <div
          className="relative"
          onFocus={() => {
            setTagsPopup(tagsPopup + 1);
          }}
          onBlur={() => {
            setTagsPopup(tagsPopup - 1);
          }}
          tabIndex={-1}
        >
          <input
            onChange={(e) => {
              setTagsSearch(e.target.value);
            }}
            className="mb-2 w-8/12 px-2 bg-transparent border border-gray-500 rounded-sm h-6"
          />
          <SelectedTags />
          <div
            className={`max-w-[650px] min-w-[400px] translate-y-2 rounded-md gap-1 text-xs absolute left-0 top-full flex flex-wrap bg-primary-100 ${tagsPopup > 0 ? "p-2" : ""
              }`}
            onFocus={() => {
              setTagsPopup(tagsPopup + 1);
            }}
            onBlur={() => {
              setTagsPopup(tagsPopup - 1);
            }}
            tabIndex={-1}
          >
            {tagsPopup > 0 &&
              allTags.map(
                (tag, index) =>
                  inSearch(tag) && (
                    <Pill tag={tag} tags={tags} setTags={setTags} key={index} />
                  )
              )}
            {allTags.findIndex((tag) => inSearch(tag)) === -1 && (
              <div className="transition-colors duration-300 select-none cursor-pointer rounded-full px-3 py-1 bg-primary-400 hover:bg-primary-500">
                No tags matching
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="w-1/2">
        <p>Rating</p>
        <div className="flex justify-between">
          <input
            className="w-2/5 px-2 bg-transparent border border-gray-500 rounded-sm h-6"
            onChange={(e) => {
              setMinRating(e.target.value);
            }}
          />
          <span>-</span>
          <input
            className="w-2/5 px-2 bg-transparent border border-gray-500 rounded-sm h-6"
            onChange={(e) => {
              setMaxRating(e.target.value);
            }}
          />
        </div>
      </div>
    </section>
  )
}

const ProblemCard = ({ problem }: { problem: CFProblem }) => {
  const [tagsHidden, setTagsHidden] = useState<boolean>(true);

  return (
    <section className="w-full flex justify-center text-lg my-8">
      <div className="p-4 bg-primary-400 rounded-md w-1/2 border">
        <p className="text-xs">Title:</p>
        <a
          href={`https://codeforces.com/contest/${problem.contestId}/problem/${problem.index}`}
          target="_blank"
        >
          <p className="mb-4 underline cursor-pointer hover:text-blue-400">
            {problem.contestId + problem.index + " " + problem.name}
          </p>
        </a>
        <div className="flex gap-4">
          <div>
            <p className="text-xs">Rating:</p>
            <p>{problem.rating}</p>
          </div>
          <div>
            <p className="text-xs">Tags:</p>
            {tagsHidden ? (
              <p
                onClick={() => {
                  setTagsHidden(false);
                }}
                className="underline cursor-pointer hover:text-text-100"
              >
                show
              </p>
            ) : (
              <div className="flex">

                <p>{problem.tags.join(", ")}</p>
                <span
                  onClick={() => {
                    setTagsHidden(true);
                  }}
                  className="ml-2 underline cursor-pointer hover:text-text-100"
                >
                  hide
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

const CFQuery = () => {
  const [tags, setTags] = useState<string[]>([]);
  const [minRating, setMinRating] = useState<string>("");
  const [maxRating, setMaxRating] = useState<string>("");
  const [problem, setProblem] = useState<CFProblem>();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const queryProblem = async () => {
    if (isLoading) {
      return;
    }
    setIsLoading(true);
    const queryRating =
      (minRating === "" ? "0" : minRating) +
      ";" +
      (maxRating === "" ? "3500" : maxRating);
    let result;
    try {
      result = await recommendProblem({
        tags: tags.join(";"),
        rating: queryRating,
      });
    } catch (err) {
      alert("Search took too long.");
      return "error";
    }
    setIsLoading(false);

    if (result.error) {
      alert(result.error)
      return "error";
    }
    setProblem(result);
  };

  const addProblem = async () => {
    const url = `https://codeforces.com/contest/${problem?.contestId}/problem/${problem?.index}`;
    try {
      const result = await postProblem({ problemUrl: url });
      console.log(result);
      await navigateToProblem({ problemId: result._id });
    } catch (e) {
      alert(e);
      //TODO: Send popup
    }
  };


  return (
    <div className="text-text-50 w-3/4">
      <h1 className="text-xl mb-4">CF problem recommender</h1>
      <Filter tags={tags} setTags={setTags} setMaxRating={setMaxRating} setMinRating={setMinRating} />
      {isLoading && <div>LOADING...</div>}
      {!isLoading && problem && (
        <ProblemCard problem={problem} />
      )}
      <div className="w-full flex justify-end">
        <div
          onClick={queryProblem}
          className={`rounded-full py-1 px-4 ${isLoading
            ? "cursor-wait bg-primary-100"
            : "cursor-pointer bg-primary-400"
            }`}
        >
          {problem ? "Skip" : "Find"}
        </div>

        {problem && !isLoading && (
          <div
            className="ml-4 rounded-full bg-primary-400 py-1 px-4 cursor-pointer"
            onClick={addProblem}
          >
            Solve
          </div>
        )}
      </div>
    </div>
  );
};

export default CFQuery;
