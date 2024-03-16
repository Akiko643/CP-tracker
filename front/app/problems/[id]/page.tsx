import { getProblem } from "@/api";
import ProblemPage from "@/app/components/Problem";
import ReturnPage from "@/app/components/ReturnPage";
import { Problem } from "@/types/types";

const Page = async ({ params }: { params: { id: string } }) => {
  const { id } = params;
  // const data: { status: number } | Problem = await getProblem(id);
  // if (data.status === 401) {
  //   return <ReturnPage />;
  // }

  return <ProblemPage id={id} />;
};

export default Page;
