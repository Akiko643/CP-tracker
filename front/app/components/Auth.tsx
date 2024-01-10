// "use client";

import { getServerSession } from "next-auth";
import { getSession, signIn, signOut } from "next-auth/react";
import { OPTIONS } from "../api/auth/[...nextauth]/route";

export default async function Component({ children }: any) {
  const session = await getServerSession(OPTIONS);
  if (!session) {
    return <></>;
  }
  return <>{children}</>;
}
