"use server";
import { getProblems } from "@/api";
import { OPTIONS } from "@/app/api/auth/[...nextauth]/route";
import ProblemList from "@/app/components/ProblemList";
import Search from "@/app/components/Search";
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
  const problems = await getProblems({ status });
  return (
    <div className="overflow-y-auto flex flex-row">
      <div className="w-10/12">
        <ProblemList data={problems} />
      </div>
      <Search />
    </div>
  );
}
