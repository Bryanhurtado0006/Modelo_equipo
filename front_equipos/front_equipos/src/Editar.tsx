// src/pages/Editar.tsx - SIN IF NI TRY (Para Editar PRESIDENTE)
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const Editar: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const dni_a_editar = location.state as number;

    const [dni, setDni] = useState<number>(0);
    const [nombre, setNombre] = useState<string>('');
    const [mensaje, setMensaje] = useState<string>('');

    useEffect(() => {
        setDni(dni_a_editar); // Asigna el DNI recibido

        const traerPresidente = async () => {
            const respuesta = await fetch(`http://localhost:3333/presidente/${dni_a_editar}`);
            const obj = await respuesta.json();
            setNombre(obj.mensaje.nombre); // Asume que obj.mensaje contiene el objeto presidente
        };
        traerPresidente();
    }, [dni_a_editar]); // Necesario para que se active cuando se pase el DNI

    const actualizar = async () => {
        const msj = await fetch(`http://localhost:3333/presidente/${dni}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ nombre })
        });
        const res = await msj.json();
        setMensaje(res.mensaje);
        navigate('/listarPresi'); // Siempre navega, asume éxito
    };

   return (
        <div className="container">
            <h2>Editar Presidente</h2>
            <div className="form-container">
                <div className="form-group">
                    <label htmlFor="dniReadonly">DNI:</label>
                    <input type="text" id="dniReadonly" value={dni} readOnly />
                </div>
                <div className="form-group">
                    <label htmlFor="nombrePresiEditar">Nombre:</label>
                    <input type="text" id="nombrePresiEditar" value={nombre} onChange={(e) => setNombre(e.target.value)} />
                </div>
                <button className="btn" onClick={actualizar}>Actualizar</button>
                {mensaje && <p className="message message-success">{mensaje}</p>} {/* Asume éxito */}
            </div>
        </div>
    );
}

export default Editar;