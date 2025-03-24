import { signIn } from "@/auth";
import Image from "next/image";

export default function SignIn() {
  return (
    <form
      action={async () => {
        "use server";
        await signIn("google", { redirectTo: "/" });
      }}
    >
      <button
        type="submit"
        className="border px-5 py-2.5 rounded-lg hover:bg-blue-900 w-full flex justify-between"
      >
        <p>Sign in with Google</p>
        <Image src="/google.png" width={22} height={22} alt="google logo" />
      </button>
    </form>
  );
}
