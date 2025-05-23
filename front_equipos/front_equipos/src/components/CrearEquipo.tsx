import { useState } from "react";

 interface  Presidente {
  dni: number;
  nombre: string;
}

const CrearEquipo: React.FC = () => {
  // Estados para el equipo
  const [codigo, setCodigo] = useState<number>(0);
  const [nombre, setNombre] = useState<string>('');
  const [anioFundacion, setAnioFundacion] = useState<number>(0);
  
  // Estados para el presidente
  const [dniPresidente, setDniPresidente] = useState<number>(0);
  const [nombrePresidente, setNombrePresidente] = useState<string>('');
  
  const [mensaje, setMensaje] = useState<string>('');

  const guardarEquipo = async () => {
    if (!codigo || !nombre || !anioFundacion || !dniPresidente || !nombrePresidente) {
      setMensaje('Todos los campos son obligatorios');
      return;
    }

    try {
      const respuesta = await fetch('http://localhost:5440/crear_equipos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          codigo,
          nombre,
          anio_fundacion: anioFundacion,
          presidente: {
            dni: dniPresidente,
            nombre: nombrePresidente
          }
        })
      });

      const resultado = await respuesta.json();
      setMensaje(resultado.mensaje);
      
      // Limpiar formulario si fue exitoso
      if (respuesta.ok) {
        setCodigo(0);
        setNombre('');
        setAnioFundacion(0);
        setDniPresidente(0);
        setNombrePresidente('');
      }
    } catch (error) {
      setMensaje('Error al conectar con el servidor');
    }
  };

  return (
    <div>
      <h2>Crear Nuevo Equipo</h2>
      
      <div>
        <label>Codigo:</label>
        <input 
          type="number" 
          value={codigo}
          onChange={(e) => setCodigo(Number(e.target.value))}
        />
      </div>
      
      <div>
        <label>Nombre Equipo:</label>
        <input 
          type="text" 
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
        />
      </div>
      
      <div>
        <label>Año Fundacion:</label>
        <input 
          type="number" 
          value={anioFundacion}
          onChange={(e) => setAnioFundacion(Number(e.target.value))}
        />
      </div>
      
      <h3>Datos del Presidente</h3>
      
      <div>
        <label>DNI:</label>
        <input 
          type="number" 
          value={dniPresidente}
          onChange={(e) => setDniPresidente(Number(e.target.value))}
        />
      </div>
      
      <div>
        <label>Nombre:</label>
        <input 
          type="text" 
          value={nombrePresidente}
          onChange={(e) => setNombrePresidente(e.target.value)}
        />
      </div>
      
      <button onClick={guardarEquipo}>Guardar</button>
      
      {mensaje && <p>{mensaje}</p>}
    </div>
  );
};

export default CrearEquipo;



