import { useEffect, useState } from "react";
import Source from "./source";
import StatusSelector from "./statusSelector";

export default function ProblemList({ filter, setFilter }) {
  const [data, setData] = useState({
    source: [
      { name: "All Source" },
      { name: "Codeforces", source: "codeforces.com" },
      { name: "Usaco", source: "usaco.com" },
      { name: "Leetcode", source: "leetcode.com" },
    ],
    problems: [],
  });
  const setStatus = (p, status) => {
    for (let i = 0; i < data.problems.length; i++) {
      if (data.problems[i] == p) {
        p.status = status;
      }
    }

    setData(data);
  };
  useEffect(() => {
    var requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    fetch("api/problems", requestOptions)
      .then((response) => response.text())
      .then((result) => {
        setData({ ...data, problems: JSON.parse(result).problems });
      })
      .catch((error) => alert(error));
  }, []);
  return (
    <div className="w-full">
      <Source data={data} setFilter={setFilter} filter={filter} />
      <div className="w-full flex justify-between border-b border-zinc-400 h-12 items-center">
        <div className="flex w-8/12">
          <div className="px-4 text-zinc-400 text-sm w-1/4">Status</div>
          <div className="px-4 text-zinc-400 text-sm w-3/4">Title</div>
        </div>
        <div className="px-4 text-zinc-400 text-sm w-2/12">Difficulty</div>
      </div>
      <div className="">
        {data.problems.map((p, i) => {
          return (
            <div
              className={`flex justify-between h-12 w-full rounded items-center ${
                i % 2 ? "bg-zinc-700" : ""
              }`}
              key={`problem-${i}`}
            >
              <div className="flex w-8/12">
                <div className="w-1/4 px-4">
                  <StatusSelector p={p} setStatus={setStatus} />
                </div>
                <h2 className="w-3/4 px-4">{p.title}</h2>
              </div>
              <h2 className="w-2/12 px-4">{p.difficulty}</h2>
            </div>
          );
        })}
      </div>
    </div>
  );
}
