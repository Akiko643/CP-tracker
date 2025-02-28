"use client";

import Image from "next/image";
import { Problem } from "@/types/types";
import { useProblems } from "../provider/ProblemProvider";
import Link from "next/link";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisVertical } from "@fortawesome/free-solid-svg-icons";
import { updateProblem, deleteProblem } from "@/api";

function StatusIndicator({ status }: { status: string }) {
  if (status == "Solved")
    return <div className="w-2 bg-green-500 h-full"></div>;
  if (status == "Skipped")
    return <div className="w-2 bg-yellow-500 h-full"></div>;
  return <div className="w-2 bg-red-500 h-full"></div>;
}

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

function ListLine({ problem, index }: { problem: Problem; index: number }) {
  const [showDelete, setShowDelete] = useState(false);
  const { deleteProblemProvider } = useProblems();

  return (
    <div
      key={`problem-${index}`}
      className="relative w-full flex my-2 h-10 items-center bg-primary-900 rounded-md text-gray-300"
    >
      <div className="w-8 flex justify-center h-full">
        <StatusIndicator status={problem.status} />
      </div>
      {/* Problem title */}
      <div className="flex-1">
        <Link href={`problems/${problem._id}`}>{problem.title}</Link>
      </div>
      {/* Problem difficulty */}
      <div className="w-32 border-x border-dashed border-gray-300 mx-1 flex justify-center items-center">
        {problem.difficulty}
      </div>
      {/* Problem source */}
      <div className="w-40 border-r border-dashed border-gray-300 mr-1 flex justify-center items-center">
        {problem.source}
      </div>
      {/* Remove button */}
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
        {showDelete && (
          <div
            className="hover:cursor-pointer hover:bg-gray-300 px-2 text-red-500 bg-gray-100 z-30 absolute -bottom-5 right-0 overflow-visible"
            onClick={() => {
              deleteProblem({ problemId: problem._id });
              deleteProblemProvider(index);
            }}
          >
            Remove
          </div>
        )}
      </button>
    </div>
  );
}

export default function ProblemList() {
  const { problems, showProblemAdd, setProblemAdd } = useProblems();
  return (
    <section className="px-4 flex-1">
      <div className="flex justify-between">
        <div className="text-2xl text-gray-300">Recents</div>
        <button
          onClick={() => setProblemAdd(true)}
          className="pt-6 text-blue-300 text-sm decoration-transparent transition duration-200 underline underline-offset-4 hover:decoration-blue-300"
        >
          +Add Problem
        </button>
      </div>
      <div className="w-full flex mb-2">
        <div className="w-8"></div>
        <div className="flex-1 text-gray-500">Title</div>
        <div className="text-gray-500 w-32 pl-2">Difficulty</div>
        <div className="text-gray-500 w-40 pl-2">Resource</div>
        <div className="px-5"></div>
      </div>
      <div className="h-0.5 w-full bg-gray-500"></div>
      <div>
        {problems.map((problem: Problem, index: number) => {
          return <ListLine key={index} problem={problem} index={index} />;
        })}
      </div>
    </section>
  );
}
