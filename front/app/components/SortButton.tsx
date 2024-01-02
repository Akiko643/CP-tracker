"use client";
import Image from "next/image";
import { useState } from "react";

export const SortButton = ({ name }: { name: string }) => {
  const [state, setState] = useState<number>(0);
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
          src="./Polygon 1.svg"
          height={10}
          width={10}
          alt="Polygon up"
          className={`mb-1 ${state > 0 && "invisible"}`}
        />
        <Image
          src="./Polygon 2.svg"
          height={10}
          width={10}
          alt="Polygon down"
          className={`${state < 0 && "invisible"}`}
        />
      </div>
    </div>
  );
};
