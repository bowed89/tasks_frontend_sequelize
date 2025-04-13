// src/components/NewTaskModal.jsx
import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
import axios from "axios";

import { alertMessage } from "../utils/alertMessage";

import "../styles/NewTaskModal.css";

const URL = process.env.REACT_APP_URL_BACKEND;

function UpdateTaskModal({ onClose, onCreated, idTask }) {
  const [form, setForm] = useState({
    titulo: "",
    descripcion: "",
    estado: "",
    fecha_limite: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleUpdate = async () => {
    const token = Cookies.get("token");

    try {
      await axios.put(
        `${URL}/tasks/${idTask}`,
        { ...form, form },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alertMessage("success", "Tarea Actualizada", "Se actualizo la tarea correctamente.");
      onCreated(); // refrescar lista
      onClose(); // cerrar modal
    } catch (error) {
      console.error("Error al actualizar tarea:", error.response.data.message);
      alertMessage("error", "Error", error.response?.data?.message);
    }
  };

  const fetchData = async (id) => {
    const token = Cookies.get("token");

    if (!token) {
      alertMessage("error", "Error", "No se encontró el token en las cookies.");
      return;
    }

    try {
      const response = await axios.get(`${URL}/tasks/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const { fecha_limite, descripcion, estado, titulo } = response.data;

      const fechaInput = new Date(fecha_limite).toISOString().slice(0, 16);

      setForm({
        titulo,
        descripcion,
        estado,
        fecha_limite: fechaInput,
      });
    } catch (err) {
      console.error("Error al cargar datos:", err);
      alertMessage("error", "Error", "No se pudo cargar el listado.");
    }
  };

  useEffect(() => {
    fetchData(idTask);
  }, []);

  return (
    <div className="modal-backdrop">
      <div className="modal">
        <h3>Actualizar Tarea</h3>
        <input type="text" name="titulo" placeholder="Título" value={form.titulo} onChange={handleChange} />
        <input
          type="text"
          name="descripcion"
          placeholder="Descripción"
          value={form.descripcion}
          onChange={handleChange}
        />

        <select name="estado" value={form.estado} onChange={handleChange}>
          <option value="Pendiente">Pendiente</option>
          <option value="En Progreso">En Progreso</option>
          <option value="Completada">Completada</option>
        </select>

        <input type="datetime-local" name="fecha_limite" value={form.fecha_limite} onChange={handleChange} />
        <div className="modal-actions">
          <button className="btn btn-cancel" onClick={onClose}>
            Cancelar
          </button>
          <button className="btn btn-confirm" onClick={handleUpdate}>
            Actualizar
          </button>
        </div>
      </div>
    </div>
  );
}

export default UpdateTaskModal;
