import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface Presidente {
  dni: number;
  nombre: string;
}

const Listado: React.FC = () => {
  const navigate = useNavigate();
  const [presidente, setPresidente] = useState<Presidente[]>([]);

  const listar = async () => {
    const resp = await fetch('http://localhost:3333/presidente');
    const datos = await resp.json();
    console.log(datos);
    setPresidente(datos.mensaje);
  };

  useEffect(() => {
    listar();
  }, []);

  const eliminar = async (dni: number) => {
    const response = await fetch(`http://localhost:3333/presidente/${dni}`, {
      method: 'DELETE',
    });
    const msje = await response.json();
    console.log(msje);
    listar(); 
  };

  const llevar = (dnis: number) => {
    navigate('/actualizar',{ state:dnis});
  };

  return (
    <div>
      <h2>Listado de Presidentes</h2>
      <table>
        <thead>
          <tr>
            <th>DNI</th>
            <th>Nombre</th>
            <th>Opciones</th>
          </tr>
        </thead>
        <tbody>
          {presidente.map((index) => (
            <tr>
              <td>{index.dni}</td>
              <td>{index.nombre}</td>
              <td>
                <button onClick={() => eliminar(index.dni)}>Eliminar</button>
                <button onClick={() => llevar(index.dni)}>Actualizar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Listado;
