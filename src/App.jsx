import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation, useNavigate } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import PrivateRoute from "./components/PrivateRoute";
import { isLoggedIn } from "./utils/auth";

// Este componente necesita estar dentro del Router
function AppContent() {
  const location = useLocation();
  const navigate = useNavigate();

  const hideHeader = location.pathname === "/login" || location.pathname === "/register";

  useEffect(() => {
    const publicRoutes = ["/login", "/register"];
    const hasAccess = isLoggedIn();

    if (!hasAccess && !publicRoutes.includes(location.pathname)) {
      navigate("/login");
    }
  }, [location]);

  return (
    <>
      {!hideHeader && <Header />}
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={<PrivateRoute><Home /></PrivateRoute>} />
      </Routes>
    </>
  );
}

// Ahora App solo contiene el Router y lo pone alrededor de AppContent
export default function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}
