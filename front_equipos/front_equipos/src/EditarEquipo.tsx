// src/pages/EditarEquipo.tsx - SIN IF NI TRY
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const EditarEquipo: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { codigo, dni_presidente } = location.state as { codigo: number; dni_presidente: number };

    const [nombreEquipo, setNombreEquipo] = useState("");
    const [anioFundacion, setAnioFundacion] = useState(0);
    const [nombrePresidente, setNombrePresidente] = useState("");
    const [mensaje, setMensaje] = useState("");

    useEffect(() => {
        const cargarDatos = async () => {
            const responseEquipo = await fetch(`http://localhost:3333/equipos/${codigo}`);
            const dataEquipo = await responseEquipo.json();
            setNombreEquipo(dataEquipo.mensaje.nombre);
            setAnioFundacion(dataEquipo.mensaje.anio_fundacion);

            const responsePresidente = await fetch(`http://localhost:3333/presidente/${dni_presidente}`);
            const dataPresidente = await responsePresidente.json();
            setNombrePresidente(dataPresidente.mensaje.nombre);
        };
        cargarDatos();
    }, [codigo, dni_presidente]);

    const guardarCambios = async () => {
        // Actualizar el equipo
        const responseEquipo = await fetch(`http://localhost:3333/equipos/${codigo}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                nombre: nombreEquipo,
                anio_fundacion: anioFundacion,
                dni_presidente: dni_presidente,
            }),
        });
        const dataEquipo = await responseEquipo.json();

        // Actualizar el nombre del presidente
        const responsePresidente = await fetch(`http://localhost:3333/presidente/${dni_presidente}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ nombre: nombrePresidente }),
        });
        const dataPresidente = await responsePresidente.json();

        setMensaje("Equipo y presidente actualizados con éxito."); // Siempre asume éxito
        navigate("/ListarEquipo"); // Siempre redirige
    };

     return (
        <div className="container">
            <h2>Editar Equipo</h2>
            <div className="form-container">
                <div className="form-group">
                    <label htmlFor="codigoEquipo">Código:</label>
                    <input type="text" id="codigoEquipo" value={codigo} readOnly />
                </div>
                <div className="form-group">
                    <label htmlFor="nombreEquipoEditar">Nombre del Equipo:</label>
                    <input type="text" id="nombreEquipoEditar" value={nombreEquipo} onChange={(e) => setNombreEquipo(e.target.value)} />
                </div>
                <div className="form-group">
                    <label htmlFor="anioFundacionEditar">Año de Fundación:</label>
                    <input type="number" id="anioFundacionEditar" value={anioFundacion} onChange={(e) => setAnioFundacion(Number(e.target.value))} />
                </div>

                <h3>Datos del Presidente</h3>
                <div className="form-group">
                    <label htmlFor="dniPresidenteEditar">DNI:</label>
                    <input type="text" id="dniPresidenteEditar" value={dni_presidente} readOnly />
                </div>
                <div className="form-group">
                    <label htmlFor="nombrePresidenteEditar">Nombre del Presidente:</label>
                    <input type="text" id="nombrePresidenteEditar" value={nombrePresidente} onChange={(e) => setNombrePresidente(e.target.value)} />
                </div>

                <button className="btn" onClick={guardarCambios}>Guardar Cambios</button>
                {mensaje && <p className="message message-success">{mensaje}</p>} {/* Asume éxito */}
            </div>
        </div>
    );
};

export default EditarEquipo;