"use server";
import { createGroup, getGroups } from "@/api/index";
import { Group } from "@/types/types";
import Link from "next/link";
import DoughnutCustom from "../components/DoughnutCustom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBolt,
  faCheck,
  faClipboard,
  faX,
} from "@fortawesome/free-solid-svg-icons";
import { getServerSession } from "next-auth";
import { OPTIONS } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

export default async function Groups() {
  const session = await getServerSession(OPTIONS);
  if (!session) {
    return redirect("/signin");
  }
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
      group.solvingProblems.length +
      group.todoProblems.length +
      group.skippedProblems.length;
    const doughnutData: number[] = [
      group.solvedProblems.length,
      group.solvingProblems.length,
      group.todoProblems.length,
      group.skippedProblems.length,
    ];
    return (
      <div
        key={group._id}
        className="w-[26rem] hover:shadow-lg hover:shadow-indigo-500 rounded-lg border-text-50 border-solid border-2 text-text-50 p-2 pl-4 mb-6"
      >
        <Link href={`/groups/${group._id}`}>
          <p className="text-3xl">{group.name}</p>
          <div className="flex flex-row">
            <div className="">
              <div className="my-4">
                <p className="text-2xl leading-6 font-normal">
                  {totalProblemsNumber}
                </p>
                <p className="text-base sm:text-sm">Total Problems</p>
              </div>

              <div className="flex flex-rows mb-2">
                <div className="mr-2 rounded-md bg-gradient-to-r from-green-400 to-cyan-500">
                  <FontAwesomeIcon
                    className="w-9 p-2.5"
                    color="white"
                    icon={faCheck}
                  />
                </div>
                <div className="flex flex-col">
                  <p className="leading-5 text-medium">
                    {group.solvedProblems.length} Solved
                  </p>
                  <p className="leading-3 text-sm">Problems</p>
                </div>
              </div>

              <div className="flex flex-rows mb-2">
                <div className="mr-2 rounded-md bg-gradient-to-r from-yellow-200 to-yellow-500">
                  <FontAwesomeIcon
                    className="w-9 p-2.5"
                    color="white"
                    icon={faBolt}
                  />
                </div>
                <div className="flex flex-col">
                  <p className="leading-5 text-medium">
                    {group.solvingProblems.length} Solving
                  </p>
                  <p className="leading-3 text-sm">Problems</p>
                </div>
              </div>

              <div className="flex flex-rows mb-2">
                <div className="mr-2 rounded-md bg-gradient-to-r from-sky-400 to-blue-500">
                  <FontAwesomeIcon
                    className="w-9 p-2.5"
                    color="white"
                    icon={faClipboard}
                  />
                </div>
                <div className="flex flex-col">
                  <p className="leading-5 text-medium">
                    {group.todoProblems.length} Todo
                  </p>
                  <p className="leading-3 text-sm">Problems</p>
                </div>
              </div>

              <div className="flex flex-rows mb-2">
                <div className="mr-2 rounded-md w-9 bg-gradient-to-r from-red-400 to-red-700">
                  <FontAwesomeIcon
                    className="w-9 p-2.5"
                    color="white"
                    icon={faX}
                  />
                </div>
                <div className="flex flex-col">
                  <p className="leading-5 text-medium">
                    {group.skippedProblems.length} Skipped
                  </p>
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
