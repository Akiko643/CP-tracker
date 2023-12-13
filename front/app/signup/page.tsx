"use client";

import { FormEvent, useState } from "react";
import { redirect } from "next/navigation";
import { useSession } from "next-auth/react";

export default function Signup() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleLogin(event: FormEvent<HTMLFormElement>) {
    setLoading(true);
    event.preventDefault();
    const response = await fetch('http://localhost:4000/signup', {
      body: JSON.stringify({username, password}),
      headers: {'Content-Type': 'application/json'},
      method: 'POST'
    });
    if (response.status === 200) {
      // account succesffully created
      
      redirect('/signin');
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
        <button className="button-auth">Signup</button>
      </form>
    </div>
  )
}