"use server";
import { getGroup, getGroups, getProblems } from "@/api";
import { OPTIONS } from "@/app/api/auth/[...nextauth]/route";
import ProblemList from "@/app/components/ProblemList";
import Search from "@/app/components/StatusSearch";
import { Group, Problem } from "@/types/types";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function Page({
  params,
  searchParams,
}: {
  params: { id: string };
  searchParams: {
    status: string | undefined;
  };
}) {
  const session = await getServerSession(OPTIONS);
  if (!session) {
    return redirect("/signin");
  }
  let status: string = "";
  if (searchParams.status) status = searchParams.status;
  const problems: Problem[] = await getProblems({ status, groupId: params.id });
  const group: Group = await getGroup({ id: params.id });
  const groups: Group[] = await getGroups();
  return (
    <div className="overflow-y-auto flex flex-row">
      <div className="w-10/12">
        <ProblemList
          groups={groups}
          data={problems}
          key={searchParams.status}
          groupname={group.name}
          groupId={group._id}
        />
      </div>
      <Search />
    </div>
  );
}
