import { useState } from "react";
import Image from "next/image";

export default function Search({
  focus = false,
  placeholder,
  search_function,
}) {
  const [search, setSearch] = useState("");

  return (
    <form
      onMouseDown={(e) => {
        e.stopPropagation();
      }}
      onSubmit={(e) => {
        search_function(e, search);
      }}
      className="w-full h-16 bg-zinc-700 rounded-xl px-6 shadow-md shadow-black flex items-center"
    >
      <div className="flex-1">
        <input
          ref={(input) => {
            focus && input && input.focus();
          }}
          type="text"
          className="appearance-none w-full h-full bg-zinc-700 focus:outline-0 placeholder:text-zinc-400"
          placeholder={placeholder}
          value={search}
          onChange={(v) => {
            setSearch(v.target.value);
          }}
        ></input>
      </div>
      <button type="submit">
        <Image
          src={`/icon/search.svg`}
          height={20}
          width={20}
          className="object-contain"
          alt={`Search`}
        />
      </button>
    </form>
  );
}
