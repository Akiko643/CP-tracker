"use client";

import { FormEvent, useState } from "react";
import { redirect } from "next/navigation";
import Image from "next/image";
import { signIn } from "next-auth/react";

export default function signin() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleLogin(event: FormEvent<HTMLFormElement>) {
    setLoading(true);
    event.preventDefault();
    const response = await fetch('http://localhost:4000/api/signin', {
      body: JSON.stringify({username, password}),
      headers: {'Content-Type': 'application/json'},
      method: 'POST'
    });
    if (response.status === 200) {
      // succesffully logged in
      redirect('/');
    } else {
      console.log(response);
    }
    setLoading(false);
  };
  
  return (
    <div>
      <form onSubmit={handleLogin}>
        Username
        <input type="text" value={username} disabled={loading}
          onChange={e => setUsername(e.target.value)} 
        />
        Password
        <input type="password" value={password} disabled={loading}
          onChange={e => setPassword(e.target.value)}
        />
        <button className="button-auth">Signin</button>
      </form>
      <button type="button" onClick={() => signIn('google', {callbackUrl: '/'})}
              className="button-google">
        <Image src={'/google.png'} alt={''} width={24} height={24} />
        Login with google
      </button>
    </div>
  )
}