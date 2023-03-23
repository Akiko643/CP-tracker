import Image from "next/image";

export default function Source(props) {
  return (
    <div className="flex mb-8">
      {props.data.source.map((s, i) => (
        <div
          className={`rounded-full shadow-md shadow-black h-12 justify-center items-center px-4 mr-2 text-lg flex ${
            props.filter.source == s ? "bg-gray-200 text-black" : "bg-zinc-700"
          }`}
          key={`source-${i}`}
          onClick={() => {
            props.setFilter({ ...props.filter, source: s });
          }}
        >
          <Image
            src={`/logo/${s}.png`}
            height={16}
            width={16}
            className="object-contain mr-2"
            alt={`${s} logo`}
          />
          {s}
        </div>
      ))}
    </div>
  );
}
