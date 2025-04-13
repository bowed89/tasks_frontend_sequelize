import React, { useEffect, useState } from "react";
import NewTaskModal from "../modals/NewTaskModal";
import UpdateTaskModal from "../modals/UpdateTaskModal";
import axios from "axios";
import Cookies from "js-cookie";

import { alertMessage } from "../utils/alertMessage";
import "../styles/Home.css";

const URL = process.env.REACT_APP_URL_BACKEND;

function DataTable({ filter }) {
  const token = Cookies.get("token");

  const [data, setData] = useState([]);
  const [idTask, setIdTask] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showModalUpdate, setShowModalUpdate] = useState(false);

  const fetchData = async () => {
    if (!token) {
      setError("No se encontró el token en las cookies.");
      setLoading(false);
      return;
    }

    try {
      const response = await axios.get(`${URL}/tasks`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setData(response.data);
    } catch (err) {
      console.error("Error al cargar datos:", err);
      setError("No se pudo cargar el listado.");
    } finally {
      setLoading(false);
    }
  };

  const clickUpdate = (idTask) => {
    setShowModalUpdate(true);
    setIdTask(idTask);
  };

  const clickDelete = async (id) => {
    try {
      await axios.delete(`${URL}/tasks/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      alertMessage("success", "Tarea Agregada", "Se elimino la tarea correctamente.");
      fetchData();
    } catch (err) {
      console.error("Error al cargar datos:", );
      alertMessage("error", "Error", err.response.data.message);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const filteredData = filter ?? data;

  if (loading) return <p className="table-loading">Cargando datos...</p>;
  if (error) return <p className="table-error">{error}</p>;

  return (
    <div className="table-container">
      <button className="btn btn-new" onClick={() => setShowModal(true)}>
        Nuevo
      </button>

      <table className="custom-table">
        <thead>
          <tr>
            <th>Título</th>
            <th>Descripción</th>
            <th>Estado</th>
            <th>Fecha límite</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map((item) => (
            <tr key={item.id}>
              <td data-label="Título">{item.titulo}</td>
              <td data-label="Descripción">{item.descripcion}</td>
              <td data-label="Estado">{item.estado}</td>
              <td data-label="Fecha límite">{item.fecha_limite}</td>
              <td data-label="Acciones">
                <button className="btn btn-edit" onClick={() => clickUpdate(item.id)}>
                  Editar
                </button>
                <button className="btn btn-delete" onClick={() => clickDelete(item.id)}>
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showModal && <NewTaskModal onClose={() => setShowModal(false)} onCreated={fetchData} />}
      {showModalUpdate && (
        <UpdateTaskModal idTask={idTask} onClose={() => setShowModalUpdate(false)} onCreated={fetchData} />
      )}
    </div>
  );
}

export default DataTable;
