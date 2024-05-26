"use client";

import { signOut } from "next-auth/react";

export default function Page() {
  return (
    <div>
      <button onClick={() => signOut()}>Signout</button>
    </div>
  );
}
