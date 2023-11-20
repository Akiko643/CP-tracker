"use client";

import { useSession, signIn, signOut } from "next-auth/react";

export default function Component({ children }: any) {
  const { data: session }: any = useSession();
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
