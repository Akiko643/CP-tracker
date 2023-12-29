"use client";
import Image from "next/image";
import { signIn } from "next-auth/react";
import AuthForm from "../components/authentication/AuthForm";

export default function Signin() {
  async function handleLogin(formData: FormData) {
    const data = {
      username: formData.get("username") as string,
      password: formData.get("password") as string,
    };
    try {
      const response = await signIn("credentials", data);
    } catch (error) {
      // TODO: display error message to the client
      console.log(error);
    }
  }

  return (
    <div>
      <AuthForm handleAuth={handleLogin} buttonText={"Sign in"}/>
      <button
        type="button"
        onClick={() => signIn("google", { callbackUrl: "/" })}
        className="flex items-center bg-white border border-gray-300 rounded-lg shadow-md max-w-xs px-6 py-2 text-sm font-medium text-gray-800 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
      >
        <Image src={"/google.png"} alt={""} width={24} height={24} />
        Login with google
      </button>
    </div>
  );
}
