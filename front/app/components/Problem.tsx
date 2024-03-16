"use client";

import { updateProblem } from "@/api";
import { Problem } from "@/types/types";
import { faCheck, faForward, faX } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { useProblems } from "../provider/ProblemProvider";

const Bar = ({ problem }: { problem: Problem }) => {
  const [currentStatus, setCurrentStatus] = useState(problem.status);
  const getColor = (status: string) => {
    if (status === "Solved") return "green";
    if (status === "Skipped") return "yellow";
    return "red";
  };
  const getIcon = (status: string) => {
    if (status === "Solved") return faCheck;
    if (status === "Skipped") return faForward;
    return faX;
  };
  const [visible, setVisible] = useState(false);
  const statuses = ["Solved", "Skipped", "Todo"];
  return (
    <div className="flex items-center relative">
      <div
        onClick={() => setVisible((prev) => !prev)}
        className={`mr-2 w-6 h-6 bg-${getColor(currentStatus)}-500 rounded-2xl`}
      ></div>
      {visible && (
        <div className="absolute top-7 border-solid border-2 bg-white">
          {statuses.map((status) => (
            <div
              key={status}
              onClick={() => {
                setVisible(false);
                setCurrentStatus(status);
                problem.status = status;
                updateProblem(problem);
              }}
              className="bg-background-100 text-text-100 hover:bg-background-900"
            >
              <FontAwesomeIcon
                color={getColor(status)}
                icon={getIcon(status)}
                className="w-4"
              />
              {status}
            </div>
          ))}
        </div>
      )}
      <h2 className="text-center">{problem.title}</h2>
      {/* <div className="tags flex">
        {tags.map((tag: string) => {
          return (
            <div key={tag} className="tag mx-5">
              {tag}
            </div>
          );
        })}
      </div> */}
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
    };
  }, [play, time]);

  useEffect(() => {
    return () => {
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
    <div className="overflow-y-auto max-h-[600px]">
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

const ProblemPage = ({ id }: { id: string }) => {
  const { problems } = useProblems();
  const problem = problems.find((el: Problem) => el._id === id);
  if (!problem) {
    return <div>loading...</div>;
  }
  return (
    <div className="h-screen w-screen flex px-40 justify-around text-text-50">
      <div className="flex flex-col justify-center items-center space-y-16">
        <Bar problem={problem} />
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
