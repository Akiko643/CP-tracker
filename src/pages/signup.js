import Head from "next/head";
import Link from "next/link";
import { useState } from "react";
export default function SignUp() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordRepeat, setPasswordRepeat] = useState("");

  const submit = (e) => {
    e.preventDefault();
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      username: username,
      password: password,
      passwordRepeat: passwordRepeat,
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch("http://localhost:3000/api/signUp", requestOptions)
      .then((response) => response.text())
      .then((result) => console.log(result))
      .catch((error) => console.log("error", error));
  };

  return (
    <>
      <Head>
        <title>Sign Up - CP Tracker</title>
        <meta name="description" content="Helps with tracking CP problems" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex flex-col items-center w-screen m-0 p-8 h-screen bg-zinc-900 text-white">
        <Link
          className="absolute right-2 top-2 text-xl text-zinc-400"
          href="/login"
        >
          Login
        </Link>
        <form
          className="flex flex-col h-full justify-center w-64"
          autoComplete="off"
          onSubmit={submit}
        >
          <h1 className="text-xl mb-4">Sign Up</h1>
          <div className="text-zinc-400 mb-8">
            <h1>username</h1>
            <input
              className="text-black w-full h-8 rounded-sm"
              type="text"
              value={username}
              onChange={(e) => {
                setUsername(e.target.value);
              }}
            />
            <h2>password</h2>
            <input
              className="text-black w-full h-8 rounded-sm"
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
            <h2>repeat password</h2>
            <input
              className="text-black w-full h-8 rounded-sm"
              type="password"
              value={passwordRepeat}
              onChange={(e) => {
                setPasswordRepeat(e.target.value);
              }}
            />
          </div>
          <button className="h-8 w-full bg-zinc-500 flex justify-center items-center rounded-sm active:bg-zinc-600">
            Enter
          </button>
        </form>
      </main>
    </>
  );
}
