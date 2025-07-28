export default function Login() {
  return (
    <div className="max-w-sm mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-4">Login</h2>
      <form className="space-y-4">
        <input
          type="email"
          placeholder="Email"
          className="w-full border px-3 py-2 rounded"
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full border px-3 py-2 rounded"
        />
        <button className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700">
          Sign in
        </button>
      </form>
    </div>
  )
}