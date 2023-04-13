import { useUser } from "@/providers/User.provider";
import { useState } from "react";

export default function Filter() {
  const { filter, setFilter } = useUser();
  const [form, setForm] = useState({});

  const validator = (input, type = "number") => {
    let ans = "";
    for (let i of input) {
      if (type == "number") {
        if ("0" <= i && i <= "9") {
          ans += String(i);
        }
      }
    }

    return ans;
  };

  const changeState = (input, key, type = null) => {
    input = validator(input, type);
    setForm({ ...form, [key]: input });
  };

  return (
    <form
      className="flex-1 bg-zinc-700 p-6 rounded-xl shadow-md shadow-black"
      onSubmit={() => {
        setFilter({ ...filter, ...form });
      }}
    >
      <div>
        <div className="mb-2 text-zinc-400">Rating</div>
        <div className="flex justify-between">
          <input
            className="appearance-none rounded w-5/12 h-8 bg-zinc-900 focus:outline-0"
            value={form?.lowerRating}
            type="text"
            onChange={(v) => {
              changeState(v.target.value, "lowerRating", "number");
            }}
          ></input>
          <span>-</span>
          <input
            type="text"
            className="appearance-none rounded w-5/12 h-8 bg-zinc-900 focus:outline-0"
            value={form?.upperRating}
            onChange={(v) => {
              changeState(v.target.value, "lowerRating", "number");
            }}
          ></input>
        </div>
      </div>
    </form>
  );
}
