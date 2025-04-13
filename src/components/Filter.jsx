import React, { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";

import "../styles/Filter.css";

const URL = process.env.REACT_APP_URL_BACKEND;
function Filter({ onChange }) {
  const [filters, setFilters] = useState({
    titulo: "",
    keyword: "",
    estado: "",
    fecha: "",
  });

  const getAllData = async () => {
    const token = Cookies.get("token");

    if (!token) {
      return;
    }

    try {
      const response = await axios.get(`${URL}/tasks`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log(response.data);

      onChange(response.data);
    } catch (err) {
      console.error("Error al cargar datos:", err);
    }
  };

  const findKeyWord = async (field, value) => {
    const updatedFilters = { ...filters, [field]: value };
    setFilters(updatedFilters);
    const token = Cookies.get("token");

    if (field === "keyword") {
      console.log(field);
      console.log(filters.keyword);

      try {
        const res = await axios.get(`${URL}/taskp?search=${value}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        console.log(res.data);
        onChange(res.data);
      } catch (error) {
        console.log(error);
      }
    }
    if (field === "estado") {
      console.log(value);
      if (value === "Todos") {
        getAllData();
      } else {
        try {
          const res = await axios.get(`${URL}/task?status=${value}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          console.log(res.data);
          onChange(res.data);
        } catch (error) {
          console.log(error);
        }
      }
    }

    if (field === "fecha") {
      try {
        const res = await axios.get(`${URL}/taskf?fecha=${value}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        console.log(res.data);
        onChange(res.data);
      } catch (error) {
        console.log(error);
      }
    }

    //onChange(updatedFilters);
  };

  return (
    <div className="filter-container">
      <div className="filter-group">
        <label>Palabra clave</label>
        <input
          type="text"
          placeholder="Buscar..."
          value={filters.keyword}
          onChange={(e) => findKeyWord("keyword", e.target.value)}
          className="filter-input"
        />
      </div>

      <div className="filter-group">
        <label>Estado</label>
        <select
          value={filters.estado}
          onChange={(e) => findKeyWord("estado", e.target.value)}
          className="filter-select"
        >
          <option value="Todos">Todos los estados</option>
          <option value="Pendiente">Pendiente</option>
          <option value="En Progreso">En progreso</option>
          <option value="Completada">Completado</option>
        </select>
      </div>

      <div className="filter-group">
        <label>Fecha</label>
        <input
          type="date"
          value={filters.fecha}
          onChange={(e) => findKeyWord("fecha", e.target.value)}
          className="filter-date"
        />
      </div>
    </div>
  );
}

export default Filter;
