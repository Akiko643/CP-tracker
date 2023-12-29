import { getProblem } from "@/api";
import Problem from "@/app/components/Problem";
import ReturnPage from "@/app/components/ReturnPage";

const ProblemPage = async ({ params }: { params: { id: string } }) => {
  const { id } = params;
  const data: any = await getProblem(id);
  if (data.status === 401) {
    return <ReturnPage />;
  }
  const { title, tags } = data;

  return <Problem title={title} tags={tags} />;
};

export default ProblemPage;
