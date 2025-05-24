import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface Presidente {
  dni: number;
  nombre: string;
}

interface Equipo {
  codigo: number;
  nombre: string;
  anio_fundacion: number;
  presidente: Presidente;
}

const ListarEquipo: React.FC = () => {
  const navigate = useNavigate();
  const [equipos, setEquipos] = useState<Equipo[]>([]);

  useEffect(() => {
    listar();
  }, []);

  const listar = async () => {
    try {
      const resp = await fetch("http://localhost:3333/equipos");
      const datos = await resp.json();
      console.log(datos);
      setEquipos(datos.MENSAJE); // Usa datos o datos.mensaje según tu backend
    } catch (error) {
      console.error("Error al listar equipos:", error);
    }
  };

  const eliminar = async (codigo: number) => {
    try {
      const response = await fetch(`http://localhost:3333/equipos/${codigo}`, {
        method: "DELETE",
      });
      const msje = await response.json();
      console.log(msje);
      listar();
    } catch (error) {
      console.error("Error al eliminar equipo:", error);
    }
  };

  const llevar = (codigo: number, dni_presidente: number) => {
    navigate("/EditarEquipo", { state: { codigo, dni_presidente } });
  };

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Codigo</th>
            <th>Nombre</th>
            <th>Año de Fundación</th>
            <th>DNI Presidente</th>
            <th>Nombre del Presidente</th>
            <th>Opciones</th>
          </tr>
        </thead>
        <tbody>
          {equipos.map((equipo) => (
            <tr key={equipo.codigo}>
              <td>{equipo.codigo}</td>
              <td>{equipo.nombre}</td>
              <td>{equipo.anio_fundacion}</td>
              <td>{equipo.presidente.dni}</td>
              <td>{equipo.presidente.nombre}</td>
              <td>
                <button onClick={() => eliminar(equipo.codigo)}>Eliminar</button>
                <button onClick={() => llevar(equipo.codigo, equipo.presidente.dni)}>
                  Actualizar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ListarEquipo;

