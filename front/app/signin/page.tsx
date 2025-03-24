import { redirect } from "next/navigation";
import SignIn from "@/components/sign-in";
import { signIn } from "@/auth";

export default function Page() {
  async function handleLogin(formData: FormData) {
    const data = {
      username: formData.get("username") as string,
      password: formData.get("password") as string,
    };
    try {
      const response = await signIn("credentials", data);
      redirect("/");
    } catch (error) {
      // TODO: display error message to the client
      console.log(error);
    }
  }

  return (
    <div className="flex items-center justify-center h-full">
      <div className="flex flex-col text-text-50">
        <p className="text-2xl mb-6">Sign in</p>
        <div className="my-5 h-px w-full bg-gray-500"></div>
        <SignIn />
      </div>
    </div>
  );
}
