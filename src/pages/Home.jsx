import React, { useState } from "react";
import Filter from "../components/Filter";
import DataTable from "../components/DataTable";
import "../styles/Home.css";

function Home() {
  const [filter, setFilter] = useState(null);

  return (
    <div className="home-wrapper">
      <h2 className="home-title">Gestión de Tareas</h2>
      <Filter onChange={setFilter} />
      <DataTable filter={filter} />
    </div>
  );
}

export default Home;
