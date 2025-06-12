// src/components/Nav.tsx
import { Link, useNavigate } from "react-router-dom";

const Nav: React.FC = () => {
    const navigate=useNavigate();
    const logout=()=>{
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
                <button onClick={logout}>cerrar</button>
            </ul>
        </nav>
    );
};

export default Nav;