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



    useEffect(() => {
        listar(); //obtiene los equipos.
        obtenerPresidentes(); //obtiene la lista de presidentes y los guarda en presidentes
    }, []);

    const obtenerPresidentes = async () => {
     const resp = await fetch("http://localhost:3333/presidente");
    const datos = await resp.json();
    setPresidentes(datos.mensaje);
};


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

//aplico filtro combinado (nombre año y presidente)
    const equiposFiltrados = equipos.filter((equipo) =>
    (equipo.nombre_equipo.toLowerCase().includes(filtro.toLowerCase()) ||
    equipo.anio_fundacion.toString().includes(filtro)) &&
    
    (dniSeleccionado === null || equipo.dni_presidente === dniSeleccionado)
);


     return (
        <div className="container">
            <h2>Listado de equipos con su presidente</h2>
            {/* campo de buqueda */}
    <input type="text" placeholder="Buscar por nombre o año"
      value={filtro} onChange={(e) => setFiltro(e.target.value)} className="form-control mb-3"
    />

    
    <select className="form-select mb-3" onChange={(e) => setDniSeleccionado(Number(e.target.value) || null)}
>
  <option value="">-- filtrar por presidente --</option>
    {presidentes.map((p) => (
    <option key={p.dni} value={p.dni}>
      {p.nombre}
    </option>
    ))}

    </select>




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
                        {equiposFiltrados.map((equipo) => (
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