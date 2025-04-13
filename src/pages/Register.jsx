import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/Login.css";

const URL = process.env.REACT_APP_URL_BACKEND;

function Register() {
  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    pass: "",
  });

  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMsg("");
    try {
      await axios.post(`${URL}/auth/register`, {
        nombre: formData.nombre,
        email: formData.email,
        password: formData.pass,
      });

      setMsg("✅ Registro exitoso. Redirigiendo al login...");
      setTimeout(() => navigate("/login"), 2000);
    } catch (error) {
      console.error(error);
      if (error.response?.data?.errores) {
        setMsg("❌ " + error.response.data.errores.join(", "));
      } else {
        setMsg("❌ Ocurrió un error al registrarse");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-wrapper">
      <div className="login-container">
        <h2 className="login-title">Registro</h2>
        <form onSubmit={handleRegister}>
          <input
            type="text"
            name="nombre"
            placeholder="Nombre"
            value={formData.nombre}
            onChange={handleChange}
            className="login-input"
            disabled={loading}
          />
          <input
            type="email"
            name="email"
            placeholder="Correo electrónico"
            value={formData.email}
            onChange={handleChange}
            className="login-input"
            disabled={loading}
          />
          <input
            type="password"
            name="pass"
            placeholder="Contraseña"
            value={formData.pass}
            onChange={handleChange}
            className="login-input"
            disabled={loading}
          />
          <button type="submit" className="login-button" disabled={loading}>
            {loading ? "Registrando..." : "Registrarse"}
          </button>
        </form>

        {loading && (
          <div className="spinner-container">
            <div className="spinner"></div>
          </div>
        )}

        {msg && (
          <p className="login-error" style={{ color: msg.startsWith("✅") ? "green" : "red" }}>
            {msg}
          </p>
        )}
      </div>
    </div>
  );
}

export default Register;
