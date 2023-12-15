"use client";

import { FormEvent, useState } from "react";
import Image from "next/image";
import { signIn } from "next-auth/react";
import { useSession, getSession } from "next-auth/react"
import { redirect, useRouter } from "next/navigation";

export default function Signin() {
  // const { push } = useRouter();
  const { data: session, status } = useSession();

  if (status === "authenticated") {
    // push('/'); // the part that is only after http://localhost:3000 
    redirect('http://localhost:3000'); // entire url
  }

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleLogin(event: FormEvent<HTMLFormElement>) {
    setLoading(true);
    event.preventDefault();
    await signIn('credentials', {username, password, callbackUrl: '/'});
    setLoading(false);
  }

  return (
    <div>
      <form onSubmit={handleLogin}>
        Username
        <input
          type="text"
          value={username}
          disabled={loading}
          onChange={(e) => setUsername(e.target.value)}
        />
        Password
        <input
          type="password"
          value={password}
          disabled={loading}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="button-auth">Signin</button>
      </form>
      <button
        type="button"
        onClick={() => signIn("google", { callbackUrl: "/" })}
        className="button-google"
      >
        <Image src={"/google.png"} alt={""} width={24} height={24} />
        Login with google
      </button>
    </div>
  );
}
