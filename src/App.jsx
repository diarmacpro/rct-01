import { Routes, Route, Link, Outlet } from 'react-router-dom'
import Login from './pages/Login'
import Register from './pages/Register'

/* Layout with a friendly nav */
function Layout() {
  return (
    <>
      <nav className="w-screen bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center space-x-4">
              <Link to="/" className="text-indigo-600 hover:underline">
                Home
              </Link>
              <Link to="/login" className="text-indigo-600 hover:underline">
                Login
              </Link>
              <Link to="/register" className="text-indigo-600 hover:underline">
                Register
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <main className="p-6">
        <Outlet />
      </main>
    </>
  )
}

/* Main router */
export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
      </Route>
    </Routes>
  )
}

/* Simple home page */
function Home() {
  return (
    <div className="text-center">
      <h1 className="text-3xl font-bold">Welcome 👋</h1>
      <p className="mt-2 text-gray-600">
        Choose <strong>Login</strong> or <strong>Register</strong> above.
      </p>
    </div>
  )
}