import { getProblems } from "@/api";
import Link from "next/link";

const ProblemList = async () => {
  const data: any[] = await getProblems();
  return (
    <div>
      {data.map((el) => {
        const { title, _id } = el;
        return <Link href={`${_id}`}>{title}</Link>;
      })}
    </div>
  );
};

export default ProblemList;
