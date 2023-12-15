"use client";

import { useSession, signIn, signOut } from "next-auth/react";

export default function Component({ children }: any) {
  const { status, data: session }: any = useSession();
  if (status === "loading") {
    return <>loading...</>;
  }
  if (!session) {
    return (
      <>
        signed out <br />
        <button onClick={() => signIn()}>singin</button>
      </>
    );
  }
  return <>{children}</>;
}
