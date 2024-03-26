"use client";

import { signUp } from "@/api/index";
import AuthForm from "../components/AuthForm";
import { RedirectType, redirect } from "next/navigation";
import { useState } from "react";
import { useSession } from "next-auth/react";
import { useAction } from "next-safe-action/hook";

export default function Signup() {
  const [error, setError] = useState<string>("");
  const { execute, status, result } = useAction(signUp, {
    onError(err) {
      // setError(err);
      console.log("on server?", err);
    },
  });

  async function handleSignUp(formData: FormData) {
    const data = {
      username: formData.get("username") as string,
      password: formData.get("password") as string,
    };

    execute(data);
    // const response = e);
    // if (response.message) {
    //   setError(response.message);
    // } else {
    //   redirect("/signin", RedirectType.replace);
    // }
  }

  return (
    <div className="flex items-center justify-center h-full text-text-50">
      <div className="flex flex-col ">
        <p className="text-2xl mb-6">Sign up</p>
        <AuthForm
          handleAuth={handleSignUp}
          buttonText={"Sign up"}
          errorMessage={error}
        />
      </div>
    </div>
  );
}
