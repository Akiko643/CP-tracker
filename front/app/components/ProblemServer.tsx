"use server";

import { getProblem } from "@/api";
import ReturnPage from "./ReturnPage";
import Problem from "./Problem";

const ProblemServer = async ({ id }: { id: string }) => {
  const data: any = await getProblem(id);
  if (data.status === 401) {
    return <ReturnPage />;
  }
  const { title, tags } = data;

  return <Problem />;
  //   return <div>ProblemServer</div>;
};

export default ProblemServer;
