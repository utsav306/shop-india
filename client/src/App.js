import {Routes,Route} from "react-router-dom"
import HomePage from "./pages/HomePage"
import About from "./pages/About"
import Contact from "./pages/Contact"
import Pagenotfound from "./pages/Pagenotfound"
import Register from "./pages/auth/Register"
import Login from "./pages/auth/Login"
import Dashboard from "./pages/user/Dashboard"
import PrivateRoute from "./components/Routes/Private"
import ForgotPassword from "./pages/ForgotPassword"
import AdminRoute from "./components/Routes/AdminRoute"
import AdminDashboard from "./pages/Admin/AdminDashboard"
function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage/>}/>
        <Route path="/dashboard" element={<PrivateRoute />}>
          <Route path="user" element={<Dashboard />} />
        </Route>

        <Route path="/dashboard" element={<AdminRoute />}>
          <Route path="admin" element={<AdminDashboard />} />
          
        </Route>


        <Route path="/forgot-password" element={<ForgotPassword/>}/>
        <Route path="/about" element={<About/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/contact" element={<Contact/>}/>
        <Route path="*" element={<Pagenotfound/>}/>
      </Routes>
      </>
  );
}

export default App;
