// src/components/NewTaskModal.jsx
import React, { useState } from "react";
import Cookies from "js-cookie";
import axios from "axios";

import { alertMessage } from "../utils/alertMessage";

import "../styles/NewTaskModal.css";

const URL = process.env.REACT_APP_URL_BACKEND;

function NewTaskModal({ onClose, onCreated }) {
  const [form, setForm] = useState({
    titulo: "",
    descripcion: "",
    fecha_limite: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleCreate = async () => {
    const token = Cookies.get("token");
    const usuarioId = Cookies.get("user_id");

    setLoading(true);

    try {
      await axios.post(
        `${URL}/tasks`,
        {
          ...form,
          usuarioId,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alertMessage("success", "Tarea Agregada", "Se agregó la tarea correctamente.");
      onCreated();
      onClose();
    } catch (error) {
      console.error("Error al crear tarea:", error);
      alertMessage("error", "Error", "Error al crear la tarea.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-backdrop">
      <div className="modal">
        <h3>Nueva Tarea</h3>
        <input
          type="text"
          name="titulo"
          placeholder="Título"
          value={form.titulo}
          onChange={handleChange}
          disabled={loading}
        />
        <input
          type="text"
          name="descripcion"
          placeholder="Descripción"
          value={form.descripcion}
          onChange={handleChange}
          disabled={loading}
        />
        <input
          type="datetime-local"
          name="fecha_limite"
          value={form.fecha_limite}
          onChange={handleChange}
          disabled={loading}
        />
        <div className="modal-actions">
          <button className="btn btn-cancel" onClick={onClose} disabled={loading}>
            Cancelar
          </button>
          <button className="btn btn-confirm" onClick={handleCreate} disabled={loading}>
            {loading ? "Creando..." : "Crear"}
          </button>
        </div>
        {loading && (
          <div className="spinner-container" style={{ marginTop: "1rem", textAlign: "center" }}>
            <div className="spinner"></div>
          </div>
        )}
      </div>
    </div>
  );
}

export default NewTaskModal;
