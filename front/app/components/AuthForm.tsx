export default function AuthForm({
  handleAuth,
  buttonText,
}: {
  handleAuth: (formData: FormData) => void;
  buttonText: string;
}) {
  return (
    <form action={handleAuth} className="text-text-50 flex flex-col">
      <p className="mb-1">Username</p>
      <input
        type="text"
        name="username"
        className="w-full bg-gray-100 mb-5 rounded-lg bg-text-50 text-background-900 py-1 pl-2"
        required
      />
      <p className="mb-1">Password</p>
      <input
        type="password"
        name="password"
        className="w-full bg-gray-100 mb-5 rounded-lg bg-text-50 text-background-900 py-1 pl-2"
        required
      />
      <button className="authButton">{buttonText}</button>
    </form>
  );
}
