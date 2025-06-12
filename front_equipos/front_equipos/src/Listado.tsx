// src/pages/Listado.tsx - SIN IF NI TRY
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface Presidente {
    dni: number;
    nombre: string;
}

const Listado: React.FC = () => {
    const navigate = useNavigate();
    const [presidentes, setPresidentes] = useState<Presidente[]>([]);

    const listar = async () => {
  try {
    const resp = await fetch('http://localhost:3333/presidente');
    const datos = await resp.json();
    console.log("Datos recibidos:", datos);
    setPresidentes(datos.mensaje);
  } catch (err) {
    console.error("Error al listar:", err);
  }
};


    useEffect(() => {
        listar();
          console.log("Intentando listar presidentes...");
    }, []);

    const eliminar = async (dni: number) => {
        await fetch(`http://localhost:3333/presidente/${dni}`, { method: 'DELETE' });
        listar(); // Siempre recarga, asume éxito
    };

    const llevar = (dnis: number) => {
        navigate('/actualizar', { state: dnis });
    };

    return (
        <div className="container">
            <h2>Listado de Presidentes</h2>
            <div className="table-container">
                <table className="data-table">
                    <thead>
                        <tr>
                            <th>DNI</th>
                            <th>Nombre</th>
                            <th>Opciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {presidentes.map((presi) => (
                            <tr key={presi.dni}>
                                <td>{presi.dni}</td>
                                <td>{presi.nombre}</td>
                                <td>
                                    <button className="btn btn-danger" onClick={() => eliminar(presi.dni)}>Eliminar</button>
                                    <button className="btn btn-warning" onClick={() => llevar(presi.dni)}>Actualizar</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Listado;