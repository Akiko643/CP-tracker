import { signUp } from "@/api/index";
import AuthForm from "../components/AuthForm";
import { RedirectType, redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { OPTIONS } from "../api/auth/[...nextauth]/route";

export default async function Signup() {
  async function handleSignUp(formData: FormData) {
    "use server";
    const data = {
      username: formData.get("username") as string,
      password: formData.get("password") as string,
    };

    let isSuccessful = false;
    try {
      const response = await signUp(data);
      isSuccessful = true;
    } catch (error) {
      console.log(error);
    }

    if (isSuccessful) {
      // TODO: display success message to the client
      redirect("/signin", RedirectType.replace);
    } else {
      // TODO: display error message to the client
    }
  }

  const session = await getServerSession(OPTIONS);
  if (session) {
    redirect("/");
  }
  return (
    <div className="flex items-center justify-center h-full text-text-50">
      <div className="flex flex-col ">
        <p className="text-2xl mb-6">Sign up</p>
        <AuthForm handleAuth={handleSignUp} buttonText={"Sign up"} />
      </div>
    </div>
  );
}
