"use client";

import { FormEvent, useState } from "react";
import { redirect } from "next/navigation";
import { useSession } from "next-auth/react";
import { signUp } from "@/api/index";

export default function Signup() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSignUp(event: FormEvent<HTMLFormElement>) {
    setLoading(true);
    event.preventDefault();
    const response = await signUp({ username, password });
    if (response.status === 200) {
      // account succesffully created
    } else {
      
    }
    setLoading(false);
  };
  
  return (
    <div>
      <form onSubmit={handleSignUp}>
        Username
        <input type="text" value={username} disabled={loading}
          onChange={e => setUsername(e.target.value)} 
        />
        Password
        <input type="password" value={password} disabled={loading}
          onChange={e => setPassword(e.target.value)}
        />
        <button className="button-auth">Signup</button>
      </form>
    </div>
  )
}