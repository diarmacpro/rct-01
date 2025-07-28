export default function Register() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-100">
      <div className="w-full max-sm:mx-4 max-w-sm rounded-xl bg-white p-6 shadow-xl sm:p-8">
        <h1 className="text-center text-2xl font-bold text-slate-800">Create Account</h1>
        <p className="mt-2 text-center text-sm text-slate-500">
          Fill in the form below to get started.
        </p>

        <form className="mt-6 space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-slate-700">
              Full Name
            </label>
            <input
              id="name"
              type="text"
              required
              className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-sm
                         focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-slate-700">
              Email
            </label>
            <input
              id="email"
              type="email"
              required
              className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-sm
                         focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-slate-700">
              Password
            </label>
            <input
              id="password"
              type="password"
              required
              minLength={6}
              className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-sm
                         focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
            />
          </div>

          <button
            type="submit"
            className="w-full rounded-md bg-emerald-500 py-2.5 text-sm font-semibold
                       text-white hover:bg-emerald-600 focus:outline-none focus:ring-2
                       focus:ring-emerald-500 focus:ring-offset-2"
          >
            Sign Up
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-slate-500">
          Already have an account?{' '}
          <a href="/login" className="font-medium text-emerald-600 hover:underline">
            Sign in here
          </a>
        </p>
      </div>
    </div>
  )
}