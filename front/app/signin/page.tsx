"use client";
import Image from "next/image";
import { signIn } from "next-auth/react";

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
      <form
        action={handleLogin}
        className="flex flex-col justify-center items-center"
      >
        Username
        <input
          type="text"
          name="username"
          className="w-3/12 bg-gray-100 mb-5"
        />
        Password
        <input
          type="password"
          name="password"
          className="w-3/12 bg-gray-100 mb-5"
        />
        <button className="font-bold py-2 px-4 rounded bg-blue-500 text-white hover:bg-blue-700">
          Signin
        </button>
      </form>
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
