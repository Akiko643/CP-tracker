import ProblemPage from "@/app/components/Problem";

import { useRouter } from "next/router";

export default function Page() {
  const router = useRouter();
  console.log(router.query.id);
  return <ProblemPage id={router.query.id as string} />;
}
