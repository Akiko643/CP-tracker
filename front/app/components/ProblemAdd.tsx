"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import Image from "next/image";
import { postProblem } from "@/api/index";

type Key = "ctrl" | "shift" | "alt" | string;

export const useKeyboardShortcut = (keys: Key[], callback: () => void) => {
  useLayoutEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (
        keys.every(
          (key) =>
            (key === "ctrl" && event.ctrlKey) ||
            (key === "shift" && event.shiftKey) ||
            (key === "alt" && event.altKey) ||
            (typeof key === "string" && event.key.toLowerCase() === key)
        )
      ) {
        callback();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [keys, callback]);
};

async function handleAddProblem(formData: FormData) {
  try {
    await postProblem({ problemUrl: formData.get("link") as string });
  } catch (e) {
    console.log(e);
  }
}

export default function ProblemAdd() {
  const [show, setShow] = useState(false);
  const inputRef = useRef<any>(null);

  useKeyboardShortcut(["ctrl", "q"], () => {
    setShow(true);
    setTimeout(() => {
      inputRef.current.focus();
    }, 1); //TODO: solution without timeout (problem: probably running before ref is set)
  });

  useKeyboardShortcut(["escape"], () => {
    setShow(false);
  });

  return (
    <>
      <div
        className={`absolute left-0 top-0 h-full w-full backdrop-blur select-none z-10 ${
          show ? "" : "hidden"
        }`}
        onClick={() => {
          setShow(false);
        }}
      ></div>
      <div
        className={`absolute left-0 top-0 h-full w-full flex justify-center items-center select-none ${
          show ? "" : "hidden"
        }`}
      >
        <div className="bg-primary-900 rounded-md w-1/2 h-12 flex items-center z-20">
          <Image
            src="/search.svg"
            height={30}
            width={30}
            className="mx-2"
            alt="searchIcon"
          />
          <form className="flex-1 h-full" action={handleAddProblem}>
            <input
              className="w-full bg-transparent border-none focus:border-none focus:outline-none text-text-50 h-full"
              ref={inputRef}
              name="link"
            ></input>
          </form>
        </div>
      </div>
    </>
  );
}
