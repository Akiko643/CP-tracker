"use client";

export default function GroupAdd() {
  return (
    <div
      className="h-80 w-[26rem] rounded-lg border-text-50 border-solid border-2 text-text-50 p-2 pl-4 mb-6 hover:shadow-lg hover:shadow-indigo-500"
      onClick={() => console.log("pressed")}
    >
      <p className="text-3xl">Create New Group</p>
      <span className="text-9xl">&#43;</span>
    </div>
  );
}
