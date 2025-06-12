// src/pages/ListarEquipo.tsx - CON IF Y TRY...CATCH
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface EquipoConPresidente {
    codigo: number;
    nombre_equipo: string;
    anio_fundacion: number;
    dni_presidente: number;
    nombre_presidente: string;
}
interface Presidente {
    dni: number;
    nombre: string;
}

const ListarEquipo: React.FC = () => {
    const navigate = useNavigate();
    const [equipos, setEquipos] = useState<EquipoConPresidente[]>([]);
    const [filtro, setFiltro] = useState('');
    const [presidentes, setPresidentes] = useState<Presidente[]>([]);
    const [dniSeleccionado, setDniSeleccionado] = useState<number | null>(null);
    const [mensaje, setMensaje] = useState<string>(''); // Para feedback al usuario

    useEffect(() => {
        listar(); // obtiene los equipos.
        obtenerPresidentes(); // obtiene la lista de presidentes y los guarda en presidentes
    }, []);

    const obtenerPresidentes = async () => {
        try {
            const resp = await fetch("http://localhost:3333/presidente");
            const datos = await resp.json();
            if (resp.ok && datos.mensaje) {
                setPresidentes(datos.mensaje);
            } else {
                setMensaje(`Error al obtener presidentes: ${datos.mensaje || resp.statusText}`);
            }
        } catch (error) {
            console.error("Error al obtener presidentes:", error);
            setMensaje("Error de conexión al obtener presidentes.");
        }
    };

    const listar = async () => {
        try {
            const resp = await fetch("http://localhost:3333/equipos");
            const datos = await resp.json();
            if (resp.ok && datos.MENSAJE) {
                setEquipos(datos.MENSAJE);
            } else {
                setMensaje(`Error al listar equipos: ${datos.MENSAJE || resp.statusText}`);
            }
        } catch (error) {
            console.error("Error al listar equipos:", error);
            setMensaje("Error de conexión al listar equipos.");
        }
    };

    const eliminar = async (codigo: number, nombreEquipo: string) => {
        // Confirmación visual antes de eliminar
        const confirmacion = window.confirm(`¿Estás seguro de que quieres eliminar el equipo "${nombreEquipo}"? Esta acción no se puede deshacer.`);

        if (confirmacion) { // <--- ¡Aquí está el IF!
            try {
                const resp = await fetch(`http://localhost:3333/equipos/${codigo}`, { method: "DELETE" });
                const datos = await resp.json();
                if (resp.ok) {
                    setMensaje(`Equipo "${nombreEquipo}" eliminado exitosamente.`);
                    listar(); // Recarga la lista después de la eliminación exitosa
                } else {
                    setMensaje(`Error al eliminar equipo: ${datos.mensaje || resp.statusText}`);
                }
            } catch (error) {
                console.error("Error al eliminar equipo:", error);
                setMensaje("Error de conexión al eliminar equipo.");
            }
        } else {
            setMensaje("Eliminación cancelada.");
        }
        // Limpiar mensaje después de un tiempo para no saturar la UI
        setTimeout(() => setMensaje(''), 3000);
    };

    const llevar = (codigo: number, dni_presidente: number) => {
        navigate("/EditarEquipo", { state: { codigo, dni_presidente } });
    };

    // Aplico filtro combinado (nombre, año y presidente)
    const equiposFiltrados = equipos.filter((equipo) =>
        (equipo.nombre_equipo.toLowerCase().includes(filtro.toLowerCase()) ||
        equipo.anio_fundacion.toString().includes(filtro)) &&
        (dniSeleccionado === null || equipo.dni_presidente === dniSeleccionado)
    );

    return (
        <div className="container">
            <h2>Listado de equipos con su presidente</h2>
            {/* Campo de búsqueda */}
            <div className="form-group">
                <input
                    type="text"
                    placeholder="Buscar por nombre o año"
                    value={filtro}
                    onChange={(e) => setFiltro(e.target.value)}
                    className="form-control"
                />
            </div>
            
            {/* Selector de filtro por presidente */}
            <div className="form-group">
                <select
                    className="form-control-select"
                    onChange={(e) => setDniSeleccionado(Number(e.target.value) || null)}
                    value={dniSeleccionado || ""}
                >
                    <option value="">-- filtrar por presidente --</option>
                    {presidentes.map((p) => (
                        <option key={p.dni} value={p.dni}>
                            {p.nombre}
                        </option>
                    ))}
                </select>
            </div>

            {mensaje && (
                <p className={`message ${mensaje.includes('éxito') || mensaje.includes('eliminado exitosamente') ? 'message-success' : 'message-error'}`}>
                    {mensaje}
                </p>
            )}

            <div className="table-container">
                <table className="data-table">
                    <thead>
                        <tr>
                            <th>Código</th>
                            <th>Nombre Equipo</th>
                            <th>Año Fundación</th>
                            <th>DNI Presidente</th>
                            <th>Nombre Presidente</th>
                            <th>Opciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {equiposFiltrados.length > 0 ? (
                            equiposFiltrados.map((equipo) => (
                                <tr key={equipo.codigo}>
                                    <td>{equipo.codigo}</td>
                                    <td>{equipo.nombre_equipo}</td>
                                    <td>{equipo.anio_fundacion}</td>
                                    <td>{equipo.dni_presidente}</td>
                                    <td>{equipo.nombre_presidente}</td>
                                    <td>
                                        <button className="btn btn-danger" onClick={() => eliminar(equipo.codigo, equipo.nombre_equipo)}>Eliminar</button>
                                        <button className="btn btn-warning" onClick={() => llevar(equipo.codigo, equipo.dni_presidente)}>Actualizar</button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={6} style={{ textAlign: 'center', padding: '20px' }}>No hay equipos que coincidan con el filtro.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ListarEquipo;