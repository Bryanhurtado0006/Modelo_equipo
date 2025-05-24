import { useState } from "react";

const Crear:React.FC=()=>{
    const [nombre, setNombre] = useState <string>('')
    const [mensaje,setMensaje]=useState <string>('')
    const guardarPresi=async()=>{
        const respuesta =await fetch('http://localhost:3333/presidente',{
            method:'POST',
            headers:{'Content-Type':'application/json'},
            body:JSON.stringify({nombre:nombre})
        })
        const msj = await respuesta.json()
        setMensaje(msj.mensaje)
    }
    return(
        <div style={{minHeight: '100vh', background: 'linear-gradient(to bottom right, #166534, #14532d)'}} className="d-flex align-items-center justify-content-center p-4">
            {/* Tarjeta del formulario con fondo blanco, transparencia, sombras y bordes redondeados */}
            <form className="card p-4 rounded shadow-lg w-100" style={{maxWidth: '400px', backgroundColor: 'rgba(255, 255, 255, 0.9)', border: '4px solid #22c55e'}}>
                {/* Título del formulario con estilos de texto grandes y negrita, y emojis de fútbol */}
                <h1 className="h1 fw-bold text-center text-success mb-4" style={{textShadow: '2px 2px 4px rgba(0,0,0,0.3)'}}>
                    <span style={{display: 'inline-block', transform: 'rotate(-6deg)', color: '#facc15'}}>⚽</span> CREAR EDITORIALES <span style={{display: 'inline-block', transform: 'rotate(6deg)', color: '#facc15'}}>🏆</span>
                </h1>
                
                {/* Contenedor del campo de entrada para el nombre */}
                <div className="mb-3">
                    <label htmlFor="nombreInput" className="form-label fs-5 fw-semibold text-secondary">
                        Nombre
                    </label>
                    <input 
                        type="text"
                        id="nombreInput"
                        className="form-control rounded border border-success" // Clases de Bootstrap para input
                        onChange={(e) => setNombre(e.target.value)}
                        placeholder="Escriba nombre"
                        value={nombre} // Asegura que el input sea un componente controlado
                    />
                </div>

                {/* Botón para guardar el presidente con estilos de fútbol */}
                <button 
                    type="button" 
                    onClick={guardarPresi}
                    className="btn btn-success w-100 py-3 rounded shadow" // Clases de Bootstrap para botón
                    style={{
                        backgroundColor: '#16a34a', // Verde más oscuro
                        borderColor: '#16a34a',
                        transition: 'all 0.3s ease',
                        transform: 'scale(1)',
                    }}
                    onMouseOver={(e) => (e.currentTarget.style.transform = 'scale(1.05)')}
                    onMouseOut={(e) => (e.currentTarget.style.transform = 'scale(1)')}
                    onMouseDown={(e) => (e.currentTarget.style.backgroundColor = '#15803d')} // Verde aún más oscuro al hacer clic
                    onMouseUp={(e) => (e.currentTarget.style.backgroundColor = '#16a34a')}
                >
                    Guardar
                </button>

                {/* Muestra el mensaje de respuesta de la API */}
                {mensaje && (
                    <div className={`alert mt-4 text-center ${mensaje.includes('Error') ? 'alert-danger' : 'alert-success'}`}>
                        {mensaje}
                    </div>
                )}
            </form>
        </div>
    )
}
export default Crear;