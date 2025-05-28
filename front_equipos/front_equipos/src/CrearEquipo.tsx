// src/pages/CrearEquipo.tsx - SIN IF NI TRY
import { useState, useEffect } from "react";

const CrearEquipo: React.FC = () => {
    const [nombre, setNombre] = useState('');
    const [anioFundacion, setAnioFundacion] = useState(0);
    const [dniPresidente, setDniPresidente] = useState(0);
    const [mensaje, setMensaje] = useState('');

    const guardarEquipo = async () => {
  if (!nombre.trim()) {
    setMensaje("El nombre del equipo no puede estar vacío.");
    return;
  }

  if (anioFundacion <= 0) {
    setMensaje("El año debe ser mayor a 0.");
    return;
  }

  if (!dniPresidente || dniPresidente <= 0) {
    setMensaje("El dni del presidente debe ser valido.");
    return;
  }

  const respuesta = await fetch("http://localhost:3333/equipos", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      nombre,
      anio_fundacion: anioFundacion,
      dni_presidente: dniPresidente
    })
  });

  const resultado = await respuesta.json();
  setMensaje(resultado.mensaje);

  if (respuesta.ok) {
    setNombre("");
    setAnioFundacion(0);
    setDniPresidente(0);
  }
};


   return (
        <div className="container">
            <h2>Crear Nuevo Equipo</h2>
            <div className="form-container">
                <div className="form-group">
                    <label htmlFor="nombreEquipo">Nombre Equipo:</label>
                    <input type="text" id="nombreEquipo" value={nombre} onChange={(e) => setNombre(e.target.value)} />
                </div>
                <div className="form-group">
                    <label htmlFor="anioFundacion">Año Fundacion:</label>
                    <input type="number" id="anioFundacion" value={anioFundacion} onChange={(e) => setAnioFundacion(Number(e.target.value))} />
                </div>
                <h3>Datos del Presidente (existente)</h3>
                <div className="form-group">
                    <label htmlFor="dniPresidente">DNI:</label>
                    <input type="number" id="dniPresidente" value={dniPresidente} onChange={(e) => setDniPresidente(Number(e.target.value))} />
                </div>
                <button className="btn" onClick={guardarEquipo}>Guardar</button>
                {mensaje && 
                (<p className={`message ${mensaje.includes("éxito") ? "message-success" : "message-error"}`}>
                {mensaje}</p>)} {/* Asume éxito */}
            </div>
        </div>
    );
};

export default CrearEquipo;