// src/pages/ListarEquipo.tsx - SIN IF NI TRY
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface EquipoConPresidente {
    codigo: number;
    nombre_equipo: string;
    anio_fundacion: number;
    dni_presidente: number;
    nombre_presidente: string;
}

const ListarEquipo: React.FC = () => {
    const navigate = useNavigate();
    const [equipos, setEquipos] = useState<EquipoConPresidente[]>([]);

    useEffect(() => {
        listar();
    }, []);

    const listar = async () => {
        const resp = await fetch("http://localhost:3333/equipos");
        const datos = await resp.json();
        setEquipos(datos.MENSAJE); // Asume que datos.MENSAJE siempre existe y es un array
    };

    const eliminar = async (codigo: number) => {
        await fetch(`http://localhost:3333/equipos/${codigo}`, { method: "DELETE" });
        listar(); // Siempre recarga, asume éxito
    };

    const llevar = (codigo: number, dni_presidente: number) => {
        navigate("/EditarEquipo", { state: { codigo, dni_presidente } });
    };

     return (
        <div className="container">
            <h2>Listado de Equipos con su Presidente</h2>
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
                        {equipos.map((equipo) => (
                            <tr key={equipo.codigo}>
                                <td>{equipo.codigo}</td>
                                <td>{equipo.nombre_equipo}</td>
                                <td>{equipo.anio_fundacion}</td>
                                <td>{equipo.dni_presidente}</td>
                                <td>{equipo.nombre_presidente}</td>
                                <td>
                                    <button className="btn btn-danger" onClick={() => eliminar(equipo.codigo)}>Eliminar</button>
                                    <button className="btn btn-warning" onClick={() => llevar(equipo.codigo, equipo.dni_presidente)}>Actualizar</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ListarEquipo;