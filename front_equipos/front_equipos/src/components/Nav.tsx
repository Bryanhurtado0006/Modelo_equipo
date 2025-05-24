import { Link } from "react-router-dom";

const Nav:React.FC=()=>{
    return(
        <nav>
            <ul>
                <li>
                    <Link to="/crearPresi">Crear Presidente</Link>
                </li>

                <li>
                    <Link to="/ListarEquipo">Listar Equipo </Link>
                </li>
                <li>
                    <Link to="/EditarEquipo'">Editar Equipo</Link>
                </li>
                  <li>
                    <Link to="/CrearEquipo">Crear Equipo</Link>
                </li>
                <li>
                    <Link to="/">Home</Link>
                </li>
            </ul>
        </nav>
    )
}
export default Nav