

export default function handleAuth({handleAuth, buttonText}: {handleAuth: ((formData: FormData) => void), buttonText: string}){
  return (
    <form
      action={handleAuth}
      className="flex flex-col justify-center items-center text-text-50"
    >
      Username
      <input
        type="text"
        name="username"
        className="w-3/12 bg-gray-100 mb-5"
      />
      Password
      <input
        type="password"
        name="password"
        className="w-3/12 bg-gray-100 mb-5"
      />
      <button className="font-bold py-2 px-4 rounded bg-blue-500 text-white hover:bg-blue-700">
        {buttonText}
      </button>
    </form>
  )
}