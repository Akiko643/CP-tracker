"use client";
import Image from "next/image";
import { signIn } from "next-auth/react";

export default function Signin() {
  async function handleLogin(formData: FormData) {
    const data = {
      username: formData.get('username') as string,
      password: formData.get('password') as string
    };
    try {
      const response = await signIn('credentials', data);
    } catch(error) {
      // TODO: display error message to the client
      console.log(error);
    }
  }

  return (
    <div>
      <form action={handleLogin}>
        Username
        <input type="text" name="username" />
        Password
        <input type="password" name="password" />
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
