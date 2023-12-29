
import { signUp } from "@/api/index";

export default async function Signup() {
  
  async function handleSignUp(formData: FormData) {
    'use server';
    const data = {
      username: formData.get('username') as string,
      password: formData.get('password') as string
    };
    try {
      const response = await signUp(data);
    } catch(error) {
      // TODO: display error message to the client
      console.log(error);
    }
  };
  
  return (
    <form action={handleSignUp}>
      Username
      <input type="text" name="username" 
      />
      Password
      <input type="password" name="password"
      />
      <button className="button-auth">Signup</button>
    </form>
  )
}