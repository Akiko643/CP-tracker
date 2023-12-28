import { getProblems } from "@/api";
import Link from "next/link";
import ReturnPage from "./ReturnPage";

const ProblemList = async () => {
  const data: any = await getProblems();
  if (data.status === 401) {
    return <ReturnPage />;
  }
  return (
    <div>
      {data.map((el: { title: string; _id: string }) => {
        const { title, _id } = el;
        return <Link href={`problems/${_id}`}>{title}</Link>;
      })}
    </div>
  );
};

export default ProblemList;
