// src/pages/EditarEquipo.tsx - CON IF Y TRY...CATCH
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

interface Presidente {
    dni: number;
    nombre: string;
}

const EditarEquipo: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { codigo, dni_presidente } = location.state as { codigo: number; dni_presidente: number };

    const [nombreEquipo, setNombreEquipo] = useState("");
    const [anioFundacion, setAnioFundacion] = useState(0);
    const [nuevoDniPresidente, setNuevoDniPresidente] = useState<number>(0);
    const [presidentesDisponibles, setPresidentesDisMponibles] = useState<Presidente[]>([]);
    const [mensaje, setMensaje] = useState("");

    useEffect(() => {
        const cargarDatos = async () => {
            try {
                // Cargar datos del equipo
                const responseEquipo = await fetch(`http://localhost:3333/equipos/${codigo}`);
                const dataEquipo = await responseEquipo.json();

                if (responseEquipo.ok && dataEquipo.mensaje) {
                    setNombreEquipo(dataEquipo.mensaje.nombre);
                    setAnioFundacion(dataEquipo.mensaje.anio_fundacion);
                    setNuevoDniPresidente(dataEquipo.mensaje.dni_presidente); // Establecer el DNI del presidente actual
                } else {
                    setMensaje(`Error al cargar datos del equipo: ${dataEquipo.mensaje || responseEquipo.statusText}`);
                }

                // Cargar lista de presidentes disponibles
                const responsePresidentes = await fetch(`http://localhost:3333/presidente`);
                const dataPresidentes = await responsePresidentes.json();

                if (responsePresidentes.ok && dataPresidentes.mensaje) {
                    setPresidentesDisMponibles(dataPresidentes.mensaje); // Asume que `mensaje` es un array de presidentes
                } else {
                    setMensaje(prev => prev + ` | Error al cargar presidentes: ${dataPresidentes.mensaje || responsePresidentes.statusText}`);
                }
            } catch (error) {
                console.error("Error al cargar datos:", error);
                setMensaje("Error de conexión al cargar datos.");
            }
        };
        cargarDatos();
    }, [codigo, dni_presidente]); // dni_presidente se mantiene para la carga inicial

    const guardarCambios = async () => {
        try {
            // Validaciones básicas (con if)
            if (!nombreEquipo.trim()) {
                setMensaje("El nombre del equipo no puede estar vacío.");
                setTimeout(() => setMensaje(''), 3000);
                return;
            }
            if (anioFundacion <= 0) {
                setMensaje("El año de fundación debe ser un número válido.");
                setTimeout(() => setMensaje(''), 3000);
                return;
            }
            if (nuevoDniPresidente === 0) { // Asume 0 es un DNI no válido/no seleccionado
                setMensaje("Debe seleccionar un presidente.");
                setTimeout(() => setMensaje(''), 3000);
                return;
            }

            // Actualizar el equipo con el nuevo DNI de presidente
            const responseEquipo = await fetch(`http://localhost:3333/equipos/${codigo}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    nombre: nombreEquipo,
                    anio_fundacion: anioFundacion,
                    dni_presidente: nuevoDniPresidente, // Usar el DNI seleccionado
                }),
            });
            const dataEquipo = await responseEquipo.json();

            if (responseEquipo.ok) {
                setMensaje("Equipo actualizado con éxito.");
                // Retraso para que el usuario lea el mensaje antes de navegar
                setTimeout(() => navigate("/ListarEquipo"), 1500);
            } else {
                setMensaje(`Error al actualizar equipo: ${dataEquipo.mensaje || responseEquipo.statusText}`);
                setTimeout(() => setMensaje(''), 3000);
            }
        } catch (error) {
            console.error("Error al guardar cambios:", error);
            setMensaje("Error de conexión al guardar cambios.");
            setTimeout(() => setMensaje(''), 3000);
        }
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

                <h3>Cambiar Presidente</h3>
                <div className="form-group">
                    <label htmlFor="selectPresidente">Seleccionar Nuevo Presidente:</label>
                    <select
                        id="selectPresidente"
                        value={nuevoDniPresidente} // El valor seleccionado es el DNI
                        onChange={(e) => setNuevoDniPresidente(Number(e.target.value))}
                        className="form-control-select"
                    >
                        {/* Opción por defecto para seleccionar */}
                        <option value={0}>-- Seleccione un presidente --</option>
                        {presidentesDisponibles.map((presi) => (
                            <option key={presi.dni} value={presi.dni}>
                                {presi.nombre} (DNI: {presi.dni})
                            </option>
                        ))}
                    </select>
                </div>

                <button className="btn" onClick={guardarCambios}>Guardar Cambios</button>
                {mensaje && (
                    <p className={`message ${mensaje.includes('éxito') ? 'message-success' : 'message-error'}`}>
                        {mensaje}
                    </p>
                )}
            </div>
        </div>
    );
};

export default EditarEquipo;