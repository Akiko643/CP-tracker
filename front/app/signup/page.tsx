"use client";

import { FormEvent, useState } from "react";
// import { redirect } from "next/navigation";
import { useSession } from "next-auth/react";
import { useRouter } from 'next/navigation';


export default function Signup() {
  const { data: session, status } = useSession();
  const { push } = useRouter();
  if (status === "authenticated") {
    // redirect('/');
    push('/signin');
  }

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleLogin(event: FormEvent<HTMLFormElement>) {
    setLoading(true);
    event.preventDefault();
    const response = await fetch('http://localhost:5001/signup', {
      method: 'POST',
      body: JSON.stringify({ username, password }),
      headers: {'Content-Type': 'application/json'},
      credentials: 'include'
    });
    if (response.status === 200) {
      // account succesffully created
      // redirect('/signin');
      push('/signin');
    } else {
      
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
        <button className="button-auth">Signup</button>
      </form>
    </div>
  )
}