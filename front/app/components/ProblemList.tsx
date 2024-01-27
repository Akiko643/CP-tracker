// import { useState } from "react";
"use client";
import Image from "next/image";
import Link from "next/link";
import { updateProblem } from "@/api";
import { useState } from "react";
import { Problem } from "@/types/types";

function SortButton(props: {
  name: string;
  state: number;
  setState: Function;
}) {
  const { name, state, setState } = props;

  return (
    <div
      onClick={() => {
        props.setState(((props.state + 2) % 3) - 1);
      }}
      className="flex items-center justify-between pr-4 h-full select-none"
    >
      <h3 className="text-gray-500">{name}</h3>
      <div>
        <Image
          src="./Polygon 1.svg"
          height={10}
          width={10}
          alt="Polygon up"
          className={`mb-1 ${props.state > 0 && "invisible"}`}
        />
        <Image
          src="./Polygon 2.svg"
          height={10}
          width={10}
          alt="Polygon down"
          className={`${props.state < 0 && "invisible"}`}
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

export default function ProblemList({ data }: { data: Problem[] }) {
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
      <h1 className="text-2xl mb-6 text-gray-300">Recents</h1>
      <div className="w-full flex mb-2">
        <div className="w-8"></div>
        <div className="flex-1 text-gray-500">Title</div>
        <div className="w-2/12">
          <SortButton
            name="Difficulty"
            state={diffSort}
            setState={setDiffSort}
          />
        </div>
        <div className="w-2/12">
          <SortButton name="Source" state={srcSort} setState={setSrcSort} />
        </div>
      </div>
      <div className="h-0.5 w-full bg-gray-500"></div>
      <div>
        {problems.map((problem: Problem, i: number) => {
          return (
            <div
              className="w-full flex my-2 h-10 items-center bg-primary-900 rounded-md text-gray-300"
              key={`problem-${i}`}
            >
              <div
                className="w-8 flex justify-center h-full"
                onClick={() => updateStatus(i)}
              >
                <StatusIndicator status={problem.status} />
              </div>
              <div className="flex-1">
                <Link href={`problems/${problem._id}`}>{problem.title}</Link>
              </div>
              <div className="w-2/12">{problem.difficulty}</div>
              <div className="w-2/12">{problem.source}</div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
