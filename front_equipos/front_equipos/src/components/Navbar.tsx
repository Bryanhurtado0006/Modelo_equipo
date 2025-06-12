// src/components/Nav.tsx
import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom";



const Navbar: React.FC= () => {
    const [email,setEmail]=useState("")
    const [nombre,setNombre]=useState("")
    const navigate=useNavigate();
    
    useEffect(()=>{

        const emailS=localStorage.getItem("email")
        const name = localStorage.getItem("nombre")
        if(emailS && name){
            setEmail(emailS)
            setNombre(name)
        }
    },[])  

    const logout=()=>{
        localStorage.removeItem("email")
        localStorage.removeItem("auth");
        
        navigate("/");
    }
    return (
        <nav className="navbar">
            <div className="navbar-brand">Fútbol Manager</div>
            <ul className="navbar-nav">
                <li><Link to="/home" className="nav-link">Home</Link></li>
                <li><Link to="/crearPresi" className="nav-link">Crear Presidente</Link></li>
                <li><Link to="/listarPresi" className="nav-link">Listar Presidentes</Link></li>
                <li><Link to="/CrearEquipo" className="nav-link">Crear Equipo</Link></li>
                <li><Link to="/ListarEquipo" className="nav-link">Listar Equipos</Link></li>
                <p>{email}</p>
                <p>{nombre}</p>
                <button onClick={logout}>📤</button>
            </ul>
        </nav>
    );
};

export default Navbar;