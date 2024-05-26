import ProblemPage from "@/app/components/Problem";

const Page = async ({ params }: { params: { id: string } }) => {
  const { id } = params;

  return <ProblemPage id={id} />;
};

export default Page;
