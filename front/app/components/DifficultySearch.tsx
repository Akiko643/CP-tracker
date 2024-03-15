"use client";

import { usePathname, useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { CheckBox } from "./StatusSearch";

export default function DifficultySearch() {
  const difficultyAll = ["Easy", "Medium", "Hard"];
  const [difficulty, setDifficulty] = useState([false, false, false]);
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  useEffect(() => {
    const params = new URLSearchParams(searchParams);
    let difficultyArray: string[] = [];
    if (params.get("difficulty")) {
      const difficultyString = decodeURIComponent(params.get("difficulty")!);
      difficultyArray = difficultyString.split(",");
    }
    for (let i = 0; i < 3; i++) {
      if (difficulty[i] && !difficultyArray.includes(difficultyAll[i])) {
        difficultyArray.push(difficultyAll[i]);
      } else if (!difficulty[i] && difficultyArray.includes(difficultyAll[i])) {
        difficultyArray = difficultyArray.filter(
          (difficulty) => difficulty !== difficultyAll[i]
        );
      }
    }
    const difficultyString = difficultyArray.join(",");
    const difficultyEncoded = encodeURIComponent(difficultyString);
    if (difficultyEncoded.length > 0) {
      let newPathname: string = `${pathname}?difficulty=${difficultyEncoded}`;
      if (params.get("status"))
        newPathname += "&status=" + params.get("status");
      replace(newPathname);
    } else {
      let newPathname: string = `${pathname}`;
      if (params.get("status"))
        newPathname += "?status=" + params.get("status");
      replace(newPathname);
    }
  }, [difficulty]);

  useEffect(() => {
    // initial loading -> setting initial values of Difficulty filter
    const params = new URLSearchParams(searchParams);
    if (params.get("difficulty")) {
      const difficultyString = decodeURIComponent(params.get("difficulty")!);
      const difficultyArray = difficultyString.split(",");
      const difficultyInitial: boolean[] = [];
      for (let i = 0; i < 3; i++) {
        if (difficultyArray.includes(difficultyAll[i]))
          difficultyInitial.push(true);
        else difficultyInitial.push(false);
      }
    }
  }, []);

  function updateDifficulty(index: number) {
    setDifficulty((prevDifficulty) => {
      const newDifficulty = [...prevDifficulty];
      newDifficulty[index] = !newDifficulty[index];
      return newDifficulty;
    });
  }

  return (
    <div className="w-48 p-4 bg-primary-900 rounded-md mb-2">
      <h3 className="text-gray-300">Difficulty</h3>
      <div className="pl-4">
        {difficultyAll.map((currDifficulty, index) => (
          <div
            key={index}
            className="flex select-none mt-2 items-center"
            onClick={() => updateDifficulty(index)}
          >
            <CheckBox state={difficulty[index]} size={15} />
            <p className="ml-1 text-gray-500">{currDifficulty}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
