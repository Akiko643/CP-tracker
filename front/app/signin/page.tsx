"use client";
import Image from "next/image";
import { signIn } from "next-auth/react";
import AuthForm from "../components/AuthForm";

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
    <div className="flex items-center justify-center h-full">
      <div className="flex flex-col text-text-50">
        <p className="text-2xl mb-6">Sign in</p>
        <AuthForm handleAuth={handleLogin} buttonText={"Sign in"}/>
        <div className="my-5 h-px w-full bg-gray-500"></div>
        <button
          type="button"
          onClick={() => signIn("google", { callbackUrl: "/" })}
          className="text-text-50 hover:text-background-900 flex items-center bg-white border border-gray-300 rounded-lg shadow-md max-w-xs px-6 py-2 text-sm font-medium hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
        >
          <Image src={"/google.png"} alt={""} width={24} height={24} className="mr-3"/>
          Login with google
        </button>
      </div>
    </div>
  );
}
