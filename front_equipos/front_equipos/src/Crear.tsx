// src/pages/Crear.tsx - SIN IF NI TRY
import { useState, } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const Crear: React.FC = () => {
    const navigate = useNavigate();
    const [nombre, setNombre] = useState('');
    const [mensaje, setMensaje] = useState('');

    const guardarPresi = async () => {
        const respuesta = await fetch('http://localhost:3333/presidente', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ nombre: nombre })
        });
        const msj = await respuesta.json();
        setMensaje(msj.mensaje);
        setNombre(''); // Siempre limpia, asume éxito
        navigate('/listarPresi');
        
    };

     return (
        <div className="container">
            <h2>Crear Presidente</h2>
            <div className="form-container">
                <div className="form-group">
                    <label htmlFor="nombrePresi">Nombre:</label>
                    <input
                        type="text"
                        id="nombrePresi"
                        onChange={(e) => setNombre(e.target.value)}
                        value={nombre}
                    />
                </div>
                <button className="btn" onClick={guardarPresi}>Guardar</button>
                {mensaje && <p className="message message-success">{mensaje}</p>} {/* Asume éxito */}
            </div>
        </div>
    );
}
export default Crear