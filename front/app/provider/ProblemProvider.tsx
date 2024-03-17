"use client";
import { getProblems } from "@/api";
import { Problem } from "@/types/types";
import { useSession } from "next-auth/react";
import { createContext, useContext, useEffect, useState } from "react";
import ReturnPage from "../components/ReturnPage";
import { useSearchParams } from "next/navigation";

const ProblemsContext = createContext<any>(null);

export const useProblems = () => useContext(ProblemsContext);

export const ProblemProvider = ({
  children,
}: {
  children: React.JSX.Element;
}) => {
  const searchParams = useSearchParams();

  const [problems, setProblems] = useState<Problem[]>([]);
  const session = useSession();
  if (!session) {
    return <ReturnPage />;
  }
  useEffect(() => {
    const fetchData = async () => {
      const params = new URLSearchParams(searchParams);
      const fullParams = {
        status: "",
        lower: "0",
        upper: "5000",
      };
      if (params.get("lower")) fullParams.lower = params.get("lower")!;
      if (params.get("upper")) fullParams.upper = params.get("upper")!;
      if (params.get("status"))
        fullParams.status = decodeURIComponent(params.get("status")!);
      const data = await getProblems(fullParams);
      if (data.status !== 401) setProblems(data);
    };

    fetchData();
  }, []);

  const updateProblem = (i: number, problem: Problem) => {
    setProblems([
      ...problems.slice(0, i),
      {
        ...problems[i],
        ...problem,
      },
      ...problems.slice(i + 1),
    ]);
  };

  return (
    <ProblemsContext.Provider value={{ problems, updateProblem }}>
      {children}
    </ProblemsContext.Provider>
  );
};

export default ProblemProvider;
