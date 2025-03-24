import ProblemPage from "@/app/components/Problem";

import { useRouter } from "next/router";

export default function Page() {
  const router = useRouter();
  return <ProblemPage id={router.query.id as string} />;
}
