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

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleCreate = async () => {
    const token = Cookies.get("token");
    const usuarioId = Cookies.get("user_id");

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
      alertMessage("success", "Tarea Agregada", "Se agrego la tarea correctamente.");
      onCreated(); 
      onClose(); 
    } catch (error) {
      console.error("Error al crear tarea:", error);
      alertMessage("error", "Error", "Error al crear la tarea.");
    }
  };

  return (
    <div className="modal-backdrop">
      <div className="modal">
        <h3>Nueva Tarea</h3>
        <input type="text" name="titulo" placeholder="Título" value={form.titulo} onChange={handleChange} />
        <input
          type="text"
          name="descripcion"
          placeholder="Descripción"
          value={form.descripcion}
          onChange={handleChange}
        />
        <input type="datetime-local" name="fecha_limite" value={form.fecha_limite} onChange={handleChange} />
        <div className="modal-actions">
          <button className="btn btn-cancel" onClick={onClose}>
            Cancelar
          </button>
          <button className="btn btn-confirm" onClick={handleCreate}>
            Crear
          </button>
        </div>
      </div>
    </div>
  );
}

export default NewTaskModal;
