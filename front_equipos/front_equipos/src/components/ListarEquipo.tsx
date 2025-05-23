import { useEffect, useState} from "react"
import { useNavigate } from "react-router-dom";

interface Presidente{ dni:number; nombre:string }
interface Equipo{codigo:number; nombre:string; anio_fundacion:number; presidente:Presidente}

const ListarEquipo:React.FC=()=>{
     const navigate=useNavigate();
     const [equipos,setEquipos]=useState<Equipo[]>([])

     useEffect(()=>{
        listar()
     },[])

     const listar= async()=>{
        const resp=await fetch('http://localhost:5440/verEquipos')
        const datos=await resp.json()
        console.log(datos)
        console.log(resp)
        setEquipos(datos.mensaje)
     }
     


     const eliminar=async(codigo:number,dni_presidente:number)=>{
        console.log(codigo,dni_presidente)

        const response=await fetch(`http://localhost:5440/delete/${codigo}`,{
            method:'DELETE'
        })
        const msje =await response.json()
        console.log(msje)
     };
     const llevar=(codigo:number,dni_presidente:number)=>{
        navigate('/EditarEquipo',{state:{codigo,dni_presidente}});
     };

    

     return(
        <div>
            <table>
                <thead>
                    <tr>
                        <th>codigo</th>
                        <th>nombre</th>
                        <th>año de fundacion </th>
                        <th>dni presiente</th>
                        <th>nombre de presidente</th>
                        
                    </tr>
                </thead>
                <tbody>
                    {
                        equipos.map((equipo:Equipo)=>(
                            <tr key={equipo.codigo}>
                                <td>{equipo.codigo}</td>
                                <td>{equipo.nombre}</td>
                                <td>{equipo.anio_fundacion}</td>
                                <td>{equipo.presidente.dni}</td>
                                <td>{equipo.presidente.nombre}</td>
                                <td><button onClick={()=>eliminar(equipo.codigo,equipo.presidente.dni)}>Eliminar</button></td>
                                <button onClick={()=>llevar(equipo.codigo,equipo.presidente.dni)}>Actualizar</button>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
     )
}

export default ListarEquipo;