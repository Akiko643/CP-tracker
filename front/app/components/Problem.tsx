"use client";

import { updateProblem } from "@/api";
import { Problem } from "@/types/types";
import { useEffect, useState } from "react";

const Bar = ({ title, tags }: { title: string; tags: string[] }) => {
  return (
    <div>
      <h2 className="text-center">{title}</h2>
      <div className="tags flex">
        {tags.map((tag: string) => {
          return (
            <div key={tag} className="tag mx-5">
              {tag}
            </div>
          );
        })}
      </div>
    </div>
  );
};

const Clock = ({ problem }: { problem: Problem }) => {
  const [play, setPlay] = useState(false);
  const [time, setTime] = useState(problem.spentTime);

  useEffect(() => {
    let intervalId: ReturnType<typeof setInterval>;
    if (play) {
      intervalId = setInterval(() => {
        setTime(time + 1);
        problem.spentTime++;
      }, 10);
    }
    return () => {
      clearInterval(intervalId);
      // updateProblem(problem);
    };
  }, [play, time]);
  useEffect(() => {
    return () => {
      // clearInterval(intervalId);
      updateProblem(problem);
    };
  }, []);

  const format = () => {
    const seconds = Math.floor((time % (60 * 100)) / 100);
    const minutes = Math.floor((time % (60 * 60 * 100)) / 6000);
    const hours = Math.floor((time % (24 * 60 * 60 * 100)) / (60 * 60 * 100));
    const days = Math.floor(time / (24 * 60 * 60 * 100));
    return (
      (days > 0 ? days + ":" : "") +
      (hours > 0 ? hours.toString().padStart(2, "0") + ":" : "") +
      (minutes.toString().padStart(2, "0") + ":") +
      seconds.toString().padStart(2, "0")
    );
  };

  return (
    <div className="text-center">
      <div className="text-8xl leading-loose h-96 w-96 border-4 border-slate-400 flex items-center justify-center mb-8">
        <span>{format()}</span>
      </div>
      <button
        className="authButton"
        onClick={() => {
          setPlay(!play);
        }}
      >
        {play ? "Pause" : "Start"}
      </button>
    </div>
  );
};

const Notes = ({ problem }: { problem: Problem }) => {
  const noteTitles = [
    { title: "Take aways", field: "takeaways" },
    { title: "Meta cognition", field: "metaCognition" },
    { title: "Analysis", field: "analysis" },
  ];
  return (
    <div>
      {noteTitles.map(({ title, field }: { title: string; field: string }) => (
        <div key={title} className="">
          <h3>{title}</h3>
          <textarea
            className="bg-text-50 text-background-900 h-32 w-80"
            placeholder="take your note here..."
            onChange={(e) => {
              problem[field] = e.target.value;
            }}
            defaultValue={problem[field] as string | ""}
          />
        </div>
      ))}
    </div>
  );
};

const ProblemPage = (problem: Problem) => {
  return (
    <div className="h-screen w-screen flex px-40 justify-between text-text-50">
      <div className="flex flex-col justify-center items-center space-y-16">
        <Bar title={problem.title} tags={problem.tags} />
        <Clock problem={problem} />
      </div>
      <div className="flex flex-col justify-center items-center">
        <Notes problem={problem} />
        <button
          className="mt-6 authButton"
          onClick={() => {
            updateProblem(problem);
          }}
        >
          {" "}
          save{" "}
        </button>
      </div>
    </div>
  );
};

export default ProblemPage;
