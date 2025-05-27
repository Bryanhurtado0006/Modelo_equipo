// src/pages/editar.tsx
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const Editar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [dni,setDni]=useState<number>(0)
  const [nombre, setNombre] = useState<string>('')
  const [mensaje,setMensaje]=useState<string>('')
  const dnis=location.state
 useEffect(() => {
  traerPresi()
  }, [])

  const traerPresi = async () => {
      const respuesta = await fetch(`http://localhost:3333/presidente/${dnis}`)
      const obj = await respuesta.json();
      setDni(obj.mensaje[0].dni)
      setNombre(obj.mensaje[0].nombre)
}
  

  const actualizar = async () => {
      const msj=await fetch(`http://localhost:3333/presidente/${dni}`, {
        method: 'PUT',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify({dni,nombre})
      })
      const res=await msj.json()
      setMensaje(res.mensaje)
      navigate('/listarPresi')
    }
    
  
  return (
      <div>
        <input type="text" value={dni} readOnly />
        <input type="text" value={nombre} onChange={(event)=>setNombre(event.target.value)}/>
        <button onClick={actualizar}>Actualizar</button>
      </div>
  
  )
}

export default Editar;
