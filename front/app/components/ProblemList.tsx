"use client";
import Image from "next/image";
import Link from "next/link";
import { updateProblem, deleteProblem, deleteProblemFromGroup } from "@/api";
import { useState } from "react";
import { Problem } from "@/types/types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEllipsisVertical,
  faTags,
  faRobot,
} from "@fortawesome/free-solid-svg-icons";

function SortButton({
  name,
  state,
  setState,
}: {
  name: string;
  state: number;
  setState: Function;
}) {
  return (
    <div
      onClick={() => {
        setState(((state + 2) % 3) - 1);
      }}
      className="flex items-center justify-between pr-4 h-full select-none"
    >
      <h3 className="text-gray-500">{name}</h3>
      <div>
        <Image
          src="/Polygon 1.svg"
          height={10}
          width={10}
          alt="Polygon up"
          className={`mb-1 ${state > 0 && "invisible"}`}
        />
        <Image
          src="/Polygon 2.svg"
          height={10}
          width={10}
          alt="Polygon down"
          className={`${state < 0 && "invisible"}`}
        />
      </div>
    </div>
  );
}

function StatusIndicator({ status }: { status: string }) {
  if (status == "Solved")
    return <div className="w-2 bg-green-500 h-full"></div>;
  if (status == "Skipped")
    return <div className="w-2 bg-yellow-500 h-full"></div>;
  return <div className="w-2 bg-red-500 h-full"></div>;
}

export default function ProblemList({
  data,
  groupname,
  groupId,
}: {
  data: Problem[];
  groupname: string;
  groupId: string | undefined;
}) {
  const [diffSort, setDiffSort] = useState(0);
  const [srcSort, setSrcSort] = useState(0);
  const [problems, setProblems] = useState(data);
  function nextStatus(status: string) {
    // Todo -> Solving -> Solved -> Skipped
    if (status === "Todo") return "Solving";
    if (status === "Solving") return "Solved";
    if (status === "Solved") return "Skipped";
    return "Solved";
  }

  const updateStatus = (i: number) => {
    setProblems([
      ...problems.slice(0, i),
      {
        ...problems[i],
        status: nextStatus(problems[i].status),
      },
      ...problems.slice(i + 1),
    ]);
    updateProblem({
      ...problems[i],
      status: nextStatus(problems[i].status),
    });
  };

  return (
    <section className="px-4 flex-1">
      <h1 className="text-2xl mb-6 text-gray-300">{groupname}</h1>
      <div className="w-full flex mb-2">
        <div className="w-8"></div>
        <div className="flex-1 text-gray-500">Title</div>
        <div className="w-32 mr-2">
          <SortButton
            name="Difficulty"
            state={diffSort}
            setState={setDiffSort}
          />
        </div>
        <div className="w-40 mr-2">
          <SortButton name="Source" state={srcSort} setState={setSrcSort} />
        </div>
      </div>
      <div className="h-0.5 w-full bg-gray-500"></div>
      <div>
        {problems.map((problem: Problem, i: number) => {
          const [showDelete, setShowDelete] = useState(false);
          return (
            <div
              key={`problem-${i}`}
              className="relative w-full flex my-2 h-10 items-center bg-primary-900 rounded-md text-gray-300"
            >
              <div
                className="w-8 flex justify-center h-full"
                onClick={() => updateStatus(i)}
              >
                <StatusIndicator status={problem.status} />
              </div>
              {/* Problem title */}
              <div className="flex-1">
                <Link href={`problems/${problem._id}`}>{problem.title}</Link>
              </div>
              {/* Tags */}
              <button className="px-3">
                <FontAwesomeIcon className="h-5" color="white" icon={faTags} />
              </button>
              {/* Problem difficulty */}
              <div className="w-32 border-x border-dashed border-gray-300 mx-1 flex justify-center items-center">
                {problem.difficulty}
              </div>
              {/* Problem source */}
              <div className="w-40 border-r border-dashed border-gray-300 mr-1 flex justify-center items-center">
                {problem.source}
              </div>
              <button
                className="px-3"
                onClick={() => setShowDelete(true)}
                onBlur={() => setShowDelete(false)}
              >
                <FontAwesomeIcon
                  className="h-5"
                  color="white"
                  icon={faEllipsisVertical}
                />
                {showDelete && groupId && (
                  <div
                    className="hover:cursor-pointer px-2 text-red-500 bg-gray-100 hover:bg-gray-300 z-30 absolute -bottom-5 right-0 overflow-visible"
                    onClick={() =>
                      deleteProblemFromGroup({
                        problemId: problem._id,
                        groupId,
                      })
                    }
                  >
                    Remove from group
                  </div>
                )}
                {showDelete && !groupId && (
                  <div
                    className="hover:cursor-pointer px-2 text-red-500 bg-gray-100 hover:bg-gray-300 z-30 absolute -bottom-5 right-0 overflow-visible"
                    onClick={() => deleteProblem({ problemId: problem._id })}
                  >
                    Remove
                  </div>
                )}
              </button>
            </div>
          );
        })}
      </div>
    </section>
  );
}

// #define MOD 1000000007
// ans = (ans * 2) % MOD;
