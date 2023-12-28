"use client";
import Problem from "@/app/components/Problem";
import ProblemServer from "@/app/components/ProblemServer";
import { useRouter, usePathname, useSearchParams } from "next/navigation";

const ProblemPage = () => {
  // const pathname = usePathname();
  // const id = pathname.split("/").pop() as string;
  // return <ProblemServer id={id} />;
  return <Problem />;
};

export default ProblemPage;
