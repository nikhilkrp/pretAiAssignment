
import { Routes,Route } from "react-router-dom"
import Dashboard from './pages/Dashboard'
import SignIn from "./pages/SignIn"
import Profile from "./pages/profile"
import ProtectedRoute from "./components/ProtectedRoute"


function App() {


  return (
    <div className="bg-gradient-to-tl from-pink-100 to-blue-100 flex justify-center items-center h-[100vh]">
    <Routes>
    <Route path="/" element={<SignIn/>}/>
    <Route path="/signin" element={<SignIn/>}/>
    <Route path="/dashboard" element={<ProtectedRoute><Dashboard/></ProtectedRoute>}/>
    <Route path="/profile" element={<ProtectedRoute><Profile/></ProtectedRoute>}/>
    </Routes>
    </div>
  )
}

export default App
