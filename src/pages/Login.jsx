import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";

import { alertMessage } from "../utils/alertMessage";

import "../styles/Login.css";

const URL = process.env.REACT_APP_URL_BACKEND;

function Login() {
  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${URL}/auth/login`, {
        email: user,
        password: pass,
      });

      const { token, id } = response.data;

      // Guardar token en cookie
      Cookies.set("token", token, { expires: 1 });
      Cookies.set("user_id", id, { expires: 1 });

      // Redirigir al home

      alertMessage("success", "Inicio Sesión", "Bienvenido a la página principal.");

      setTimeout(() => {
        navigate("/home");
      }, 1000);
    } catch (err) {
      console.error(err);
      alertMessage("error", "Inicio Sesión", "Error al iniciar sesión. Intentalo nuevamente.");
    }
  };

  return (
    <div className="login-wrapper">
      <div className="login-container">
        <h2 className="login-title">Iniciar sesión</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Correo electrónico"
            value={user}
            onChange={(e) => setUser(e.target.value)}
            className="login-input"
          />
          <input
            type="password"
            placeholder="Contraseña"
            value={pass}
            onChange={(e) => setPass(e.target.value)}
            className="login-input"
          />
          <button type="submit" className="login-button">
            Ingresar
          </button>
        </form>
        <Link to="/register" className="login-link">
          ¿No tienes una cuenta? Regístrate aquí
        </Link>
      </div>
    </div>
  );
}

export default Login;
