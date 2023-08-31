import { useUser } from "@/providers/User.provider";
import Image from "next/image";

export default function Source() {
  const { filter, setFilter, source } = useUser();
  return (
    <div className="flex flex-wrap mb-8">
      {source.map((s, i) => (
        <div
          className={`rounded-full my-1 shadow-md shadow-black h-12 justify-center items-center px-4 mr-2 text-lg flex ${
            filter.source.name == s.name
              ? "bg-gray-200 text-black"
              : "bg-zinc-700"
          }`}
          key={`source-${i}`}
          onClick={() => {
            setFilter({ ...filter, source: s });
          }}
        >
          <Image
            src={`/logo/${s.name}.png`}
            height={16}
            width={16}
            className="object-contain mr-2"
            alt={`${s} logo`}
          />
          {s.name}
        </div>
      ))}
    </div>
  );
}
