"use client";
import { useState } from "react";
import Image from "next/image";

interface Props {
  name: string;
  state: number;
  setState: Function;
}

function SortButton(props: Props) {
  const { name, state, setState } = props;

  return (
    <div
      onClick={() => {
        props.setState(((props.state + 2) % 3) - 1);
      }}
      className="flex items-center justify-between pr-4 h-full select-none"
    >
      <h3>{name}</h3>
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

interface Problem {
  title: string;
  difficulty: string;
  source: string;
  status: string;
}

function StatusIndicator({ status }: { status: string }) {
  if (status == "solved")
    return <div className="w-2 bg-green-500 h-full"></div>;
  if (status == "skipped")
    return <div className="w-2 bg-yellow-500 h-full"></div>;
  return <div className="w-2 bg-red-500 h-full"></div>;
}

export default function ProblemList() {
  const [diffSort, setDiffSort] = useState(0);
  const [srcSort, setSrcSort] = useState(0);
  const [problems, setProblems] = useState([
    {
      title: "4a. watermelon",
      difficulty: "1424",
      source: "codeforces",
      status: "solved",
    },
    {
      title: "5b. carrot farm",
      difficulty: "3100",
      source: "codeforces",
      status: "skipped",
    },
  ]);
  function nextStatus(status: string) {
    if (status == "solved") return "skipped";
    if (status == "skipped") return "solving";
    return "solved";
  }

  return (
    <section className="px-4 flex-1">
      <h1 className="text-2xl mb-6">Recents</h1>
      <div className="w-full flex mb-2">
        <div className="w-8"></div>
        <div className="flex-1">Title</div>
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
      <div className="h-0.5 w-full bg-teal-950"></div>
      <div>
        {problems.map((problem, i) => {
          return (
            <div
              className="w-full flex my-2 h-10 items-center bg-teal-950 rounded-md"
              key={`problem-${i}`}
            >
              <div
                className="w-8 flex justify-center h-full"
                onClick={() => {
                  setProblems([
                    ...problems.slice(0, i),
                    {
                      ...problems[i],
                      status: nextStatus(problem.status),
                    },
                    ...problems.slice(i + 1),
                  ]);
                }}
              >
                <StatusIndicator status={problem.status} />
              </div>
              <div className="flex-1">{problem.title}</div>
              <div className="w-2/12">{problem.difficulty}</div>
              <div className="w-2/12">{problem.source}</div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
