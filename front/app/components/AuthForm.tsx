export default function AuthForm({
  handleAuth,
  buttonText,
  errorMessage,
}: {
  handleAuth: (formData: FormData) => void;
  buttonText: string;
  errorMessage: string;
}) {
  return (
    <form action={handleAuth} className="text-text-50 flex flex-col">
      <p className="mb-1">Username</p>
      <input
        type="text"
        name="username"
        className="w-[300px] bg-gray-100 mb-3 rounded-lg bg-text-50 text-background-900 py-1 pl-2"
        required
      />
      <p className="mb-1">Password</p>
      <input
        type="password"
        name="password"
        className="w-[300px] bg-gray-100 mb-3 rounded-lg bg-text-50 text-background-900 py-1 pl-2"
        required
      />
      {errorMessage && (
        <div className="text-xs text-[#E01A4F]">{errorMessage.toString()}</div>
      )}
      <button className="mt-3 authButton">{buttonText}</button>
    </form>
  );
}
