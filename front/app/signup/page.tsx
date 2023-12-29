import { signUp } from "@/api/index";

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
    <form
      action={handleSignUp}
      className="flex flex-col justify-center items-center"
    >
      Username
      <input type="text" name="username" className="w-3/12 bg-gray-100 mb-5" />
      Password
      <input
        type="password"
        name="password"
        className="w-3/12 bg-gray-100 mb-5"
      />
      <button className="button-auth font-bold py-2 px-4 rounded bg-blue-500 text-white">
        Signup
      </button>
    </form>
  );
}
