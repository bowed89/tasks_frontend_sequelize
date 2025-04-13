import React from "react";
import { useNavigate } from "react-router-dom";
import { logout } from "../utils/auth";
import "../styles/Header.css";

function Header() {
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <header className="header">
      <h1 className="header-title">Gestor</h1>
      <nav className="header-nav">
        <button className="logout-btn" onClick={handleLogout}>
          Cerrar Sesión
        </button>
      </nav>
    </header>
  );
}

export default Header;
