"use server";
import { createGroup, getGroups } from "@/api/index";
import { Group } from "@/types/types";
import Link from "next/link";
import DoughnutCustom from "../components/DoughnutCustom";

export default async function Groups() {
  // async function handleCreateGroup(formData: FormData) {
  //   const data = {
  //     groupName: formData.get("groupName") as string
  //   };
  //   try {
  //     const response = await createGroup(data);
  //     console.log(response);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }

  const groups: Group[] = await getGroups();
  const groupDiv = groups.map((group: Group) => {
    const totalProblemsNumber =
      group.solvedProblems.length +
      group.skippedProblems.length +
      group.solvingProblems.length +
      group.todoProblems.length;
    const doughnutData: number[] = [
      group.solvedProblems.length,
      group.skippedProblems.length,
      group.solvingProblems.length,
      group.todoProblems.length,
    ];
    let dougnutOptions = {};
    return (
      <div
        key={group._id}
        className="w-[26rem] hover:shadow-lg hover:shadow-text-50 rounded-lg border-text-50 border-solid border-2 text-text-50 p-2 pl-4 mb-6"
      >
        <Link href={`/groups/${group._id}`}>
          <p className="text-3xl">{group.groupName}</p>
          <div className="flex flex-row">
            <div className="">
              <div className="my-4">
                <p className="text-2xl leading-6 font-normal">
                  {totalProblemsNumber}
                </p>
                <p className="text-base sm:text-sm">Total Problems</p>
              </div>

              <div className="flex flex-rows mb-2">
                <div className="mr-2">
                  <span className="text-lg font-medium text-green-100 bg-green-600 rounded-full h-9 w-9 inline-block inline-flex items-center justify-center">
                    {group.solvedProblems.length}
                  </span>
                </div>
                <div className="flex flex-col">
                  <p className="leading-5 text-medium">Solved</p>
                  <p className="leading-3 text-sm">Problems</p>
                </div>
              </div>

              <div className="flex flex-rows mb-2">
                <div className="mr-2">
                  <span className="text-lg font-medium text-yellow-100 bg-yellow-600 rounded-full h-9 w-9 inline-block inline-flex items-center justify-center">
                    {group.solvingProblems.length}
                  </span>
                </div>
                <div className="flex flex-col">
                  <p className="leading-5 text-medium">Solving</p>
                  <p className="leading-3 text-sm">Problems</p>
                </div>
              </div>

              <div className="flex flex-rows mb-2">
                <div className="mr-2">
                  <span className="text-lg font-medium text-blue-100 bg-blue-600 rounded-full h-9 w-9 inline-block inline-flex items-center justify-center">
                    {group.todoProblems.length}
                  </span>
                </div>
                <div className="flex flex-col">
                  <p className="leading-5 text-medium">Todo</p>
                  <p className="leading-3 text-sm">Problems</p>
                </div>
              </div>

              <div className="flex flex-rows mb-2">
                <div className="mr-2">
                  <span className="text-lg font-medium text-red-100 bg-red-600 rounded-full h-9 w-9 inline-block inline-flex items-center justify-center">
                    {group.skippedProblems.length}
                  </span>
                </div>
                <div className="flex flex-col">
                  <p className="leading-5 text-medium">Skipped</p>
                  <p className="leading-3 text-sm">Problems</p>
                </div>
              </div>
            </div>
            <div>
              <DoughnutCustom
                doughnutData={doughnutData}
                totalProblemsNumber={totalProblemsNumber}
              />
            </div>
          </div>
        </Link>
      </div>
    );
  });
  return (
    <div className="grid justify-items-center grid-cols-1 groups-md:grid-cols-2 xl:grid-cols-3 overflow-y-auto">
      {groupDiv}
    </div>
  );
}
