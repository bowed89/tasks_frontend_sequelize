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
  const navigate = useNavigate();

  const handleChange = (e) => {
    console.log("URL ==>", URL);

    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();

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
          />
          <input
            type="email"
            name="email"
            placeholder="Correo electrónico"
            value={formData.email}
            onChange={handleChange}
            className="login-input"
          />
          <input
            type="password"
            name="pass"
            placeholder="Contraseña"
            value={formData.pass}
            onChange={handleChange}
            className="login-input"
          />
          <button type="submit" className="login-button">
            Registrarse
          </button>
        </form>
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
