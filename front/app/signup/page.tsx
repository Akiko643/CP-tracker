"use client";
import { signUp } from "@/api/index";
import AuthForm from "../components/AuthForm";

export default async function Signup() {
  async function handleSignUp(formData: FormData) {
    const data = {
      username: formData.get("username") as string,
      password: formData.get("password") as string,
    };
    try {
      const response = await signUp(data);
      // TODO: after signed up redirect to signin page
    } catch (error) {
      // TODO: display error message to the client
      console.log(error);
    }
  }
  // TODO: protect this route from the signed in user
  return (
    <div className="flex items-center justify-center h-full text-text-50">
      <div className="flex flex-col ">
        <p className="text-2xl mb-6">Sign up</p>
        <AuthForm handleAuth={handleSignUp} buttonText={"Sign up"} />
      </div>
    </div>
  );
}
