"use client";
import Image from "next/image";
import { useState } from "react";

interface Check {
  state: boolean;
  size: number;
}
function CheckBox({ state, size }: Check) {
  if (state)
    return (
      <Image src={"/checked.svg"} height={size} width={size} alt="checked" />
    );

  return (
    <Image src={"/unchecked.svg"} height={size} width={size} alt="checked" />
  );
}

function Status({
  sort,
  setSort,
}: {
  sort: { status: string[] };
  setSort: Function;
}) {
  let statuses = ["Solved", "Skipped", "Unsolved"];

  return (
    <div className="w-48 p-4 bg-teal-950 rounded-md mb-2">
      <h3>Status</h3>
      <div className="pl-4">
        {statuses.map((status, index) => (
          <div
            className="flex select-none mt-2 items-center"
            key={`status-${index}`}
            onClick={() => {
              if (sort.status.includes(status)) {
                setSort({
                  ...sort,
                  status: sort.status.filter((el) => el != status),
                });
              } else {
                setSort({ ...sort, status: [...sort.status, status] });
              }
            }}
          >
            <CheckBox state={sort.status.includes(status)} size={15} />
            <p className="ml-1">{status}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function Difficulty({
  sort,
  setSort,
}: {
  sort: { difficulty: string[] };
  setSort: Function;
}) {
  let difficulties = ["Easy", "Medium", "Hard"];

  return (
    <div className="w-48 p-4 bg-teal-950 rounded-md">
      <h3>Difficulty</h3>
      <div className="pl-4">
        {difficulties.map((diff, index) => (
          <div
            className="flex select-none mt-2 items-center"
            key={`difficulty-${index}`}
            onClick={() => {
              if (sort.difficulty.includes(diff)) {
                setSort({
                  ...sort,
                  difficulty: sort.difficulty.filter((el) => el != diff),
                });
              } else {
                setSort({ ...sort, difficulty: [...sort.difficulty, diff] });
              }
            }}
          >
            <CheckBox state={sort.difficulty.includes(diff)} size={15} />
            <p className="ml-1">{diff}</p>
          </div>
        ))}
      </div>
      <h3>Range</h3>
      <div className="flex pl-4">
        <input className="w-16 bg-transparent border border-gray-500 rounded-sm h-6"></input>
        <p>-</p>
        <input className="w-16 bg-transparent border border-gray-500 rounded-sm h-6"></input>
      </div>
    </div>
  );
}

export default function Sort() {
  const [sort, setSort] = useState({ status: ["Solved"], difficulty: [] });
  return (
    <div className="">
      <Status sort={sort} setSort={setSort} />
      <div>
        <Difficulty sort={sort} setSort={setSort} />
      </div>
    </div>
  );
}
