import { useUser } from "@/providers/User.provider";
import Image from "next/image";
import { useState } from "react";
import AutoSizeTextarea from "./autoSizeTextArea";
import DropDown from "./dropdown";

export default function Problem({ problem }) {
  console.log(problem);
  const { sourceToName, popup, setPopup, problems, setProblems, tagList } =
    useUser();
  const [metaCognition, setMetaCognition] = useState(
    problem.metaCognition || ""
  );
  const [takeaways, setTakeaways] = useState(problem.takeaways || "");
  const [analysis, setAnalysis] = useState(problem.analysis || "");

  const updateProblem = () => {
    console.log(problem.tags);
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      metaCognition: metaCognition,
      takeaways: takeaways,
      analysis: analysis,
    });

    var requestOptions = {
      method: "PATCH",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(`http://localhost:3000/api/problems/${problem._id}`, requestOptions)
      .then((response) => response.text())
      .then((result) => console.log(JSON.parse(result)))
      .catch((error) => console.log("error", error));
  };
  const deleteProblem = () => {
    var requestOptions = {
      method: "DELETE",
      redirect: "follow",
    };

    setPopup({ ...popup, data: null, type: "loading" });
    fetch(`http://localhost:3000/api/problems/${problem._id}`, requestOptions)
      .then((response) => response.text())
      .then((result) => {
        setPopup({ ...popup, type: "off" });
        let tmp = problems;
        tmp.splice(tmp.indexOf(problem), 1);
        setProblems(tmp);
        console.log(result);
      })
      .catch((error) => console.log("error", error));
  };

  return (
    <div
      onMouseDown={(e) => {
        e.stopPropagation();
      }}
      className="w-3/4 h-4/5 p-6 font-light bg-zinc-700 rounded-xl flex flex-col"
    >
      <div className="flex items-center justify-center w-full mb-4">
        <Image
          src={`/logo/${sourceToName[problem.source]}.png`}
          height={48}
          width={48}
          className="object-contain mr-4"
          alt={`${problem.source} logo`}
        />
        <a
          target="_blank"
          href={problem.url}
          rel="noopener noreferrer"
          className="hover:text-zinc-900 transition duration-200 ease-linear flex"
        >
          <h1 className="text-5xl">
            {problem.title}
            <span className="inline-block align-top">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-6 h-6"
              >
                <path d="M15.75 2.25H21a.75.75 0 01.75.75v5.25a.75.75 0 01-1.5 0V4.81L8.03 17.03a.75.75 0 01-1.06-1.06L19.19 3.75h-3.44a.75.75 0 010-1.5zm-10.5 4.5a1.5 1.5 0 00-1.5 1.5v10.5a1.5 1.5 0 001.5 1.5h10.5a1.5 1.5 0 001.5-1.5V10.5a.75.75 0 011.5 0v8.25a3 3 0 01-3 3H5.25a3 3 0 01-3-3V8.25a3 3 0 013-3h8.25a.75.75 0 010 1.5H5.25z" />
              </svg>
            </span>
          </h1>
        </a>
      </div>
      <div>
        <DropDown list={tagList} selected={problem.tags} />
      </div>
      <div className="flex-1 overflow-y-scroll px-4 mb-8 text-zinc-200">
        <h2>Meta cognition</h2>
        <AutoSizeTextarea
          minHeight={4}
          value={metaCognition}
          setValue={setMetaCognition}
        />
        <h2 className="mt-4">Takeaways</h2>
        <AutoSizeTextarea
          minHeight={4}
          value={takeaways}
          setValue={setTakeaways}
        />
        <h2 className="mt-4">Analysis</h2>
        <AutoSizeTextarea
          minHeight={4}
          value={analysis}
          setValue={setAnalysis}
        />
      </div>
      <div className="flex justify-between px-4">
        <div
          className="w-24 h-12 bg-red-600 flex justify-center items-center rounded-sm"
          onClick={deleteProblem}
        >
          Delete
        </div>
        <div
          className="w-24 h-12 bg-green-600 flex justify-center items-center rounded-sm"
          onClick={updateProblem}
        >
          Save
        </div>
      </div>
    </div>
  );
}
