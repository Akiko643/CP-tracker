import { getProblem } from "@/api";
import ProblemPage from "@/app/components/Problem";
import ReturnPage from "@/app/components/ReturnPage";
import { Problem } from "@/types/types";

const Page = async ({ params }: { params: { id: string } }) => {
  const { id } = params;

  return <ProblemPage id={id} />;
};

export default Page;
