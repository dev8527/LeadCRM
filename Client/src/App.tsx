import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './index.css';
import Login from "./pages/Login.tsx";
import Register from "./pages/Register.tsx";
import EmailVerify from "./pages/EmailVerify.tsx";
import Dashboard from "./pages/Dashboard.tsx";
import ProspectList from "./pages/MyProspect.tsx";
import Search from "./pages/Search.tsx";
import Client from './pages/Clients.tsx';
import Settings from './pages/Settings.tsx';
import { AuthProvider } from "./context/AuthProvider.tsx";
import ProtectedRoute from "./components/ProtectedRoute.tsx";


function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/verify" element={<EmailVerify />} />
           <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} /> 
          <Route path="/myprospect" element={<ProtectedRoute><ProspectList /></ProtectedRoute>} />
          <Route path="/search" element={<ProtectedRoute><Search /></ProtectedRoute>} />
          <Route path="/clients" element={<ProtectedRoute><Client /></ProtectedRoute>} />
          <Route path="/settings" element={<ProtectedRoute><Settings /></ProtectedRoute>} />
          
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
