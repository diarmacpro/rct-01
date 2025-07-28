import { Routes, Route, Navigate } from 'react-router-dom'
import Login     from './pages/Login'
import Register  from './pages/Register'
import Dashboard from './pages/Dashboard'
import NewBot    from './pages/NewBot'
import NotFound  from './pages/NotFound'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" />} />
      <Route path="/login"    element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/dashboard"element={<Dashboard />} />
      <Route path="/new-bot"  element={<NewBot />} />
      <Route path="*"         element={<NotFound />} />
    </Routes>
  )
}

export default App