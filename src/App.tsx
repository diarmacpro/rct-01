import { Routes, Route, Navigate } from 'react-router-dom'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" />} />
      <Route path="/login" element={<h1>Login Page</h1>} />
      <Route path="/register" element={<h1>Register Page</h1>} />
      <Route path="/dashboard" element={<h1>Dashboard Page</h1>} />
      <Route path="/new-bot" element={<h1>New Bot Page</h1>} />
      <Route path="*" element={<h1>404 - Not Found</h1>} />
    </Routes>
  )
}

export default App