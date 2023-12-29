import { signUp } from "@/api/index";
import AuthForm from "../components/authentication/AuthForm";

export default async function Signup() {
  async function handleSignUp(formData: FormData) {
    "use server";
    const data = {
      username: formData.get("username") as string,
      password: formData.get("password") as string,
    };
    try {
      const response = await signUp(data);
    } catch (error) {
      // TODO: display error message to the client
      console.log(error);
    }
  }

  return (
    <AuthForm handleAuth={handleSignUp} buttonText={"Sign up"} />
  );
}
