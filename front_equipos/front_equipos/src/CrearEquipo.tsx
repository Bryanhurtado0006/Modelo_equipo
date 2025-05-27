// src/pages/CrearEquipo.tsx - SIN IF NI TRY
import { useState, useEffect } from "react";

const CrearEquipo: React.FC = () => {
    const [nombre, setNombre] = useState('');
    const [anioFundacion, setAnioFundacion] = useState(0);
    const [dniPresidente, setDniPresidente] = useState(0);
    const [mensaje, setMensaje] = useState('');

    const guardarEquipo = async () => {
        const respuesta = await fetch('http://localhost:3333/equipos', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                nombre,
                anio_fundacion: anioFundacion,
                dni_presidente: dniPresidente
            })
        });
        const resultado = await respuesta.json();
        setMensaje(resultado.mensaje);
        setNombre(''); // Siempre limpia, asume éxito
        setAnioFundacion(0);
        setDniPresidente(0);
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
                {mensaje && <p className="message message-success">{mensaje}</p>} {/* Asume éxito */}
            </div>
        </div>
    );
};

export default CrearEquipo;