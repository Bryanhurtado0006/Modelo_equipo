import { Link } from "react-router-dom";

const Nav: React.FC = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
    
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link className="nav-link" to="/crearPresi">
                Crear Presidente
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/editarPresi">
                Editar Presidente
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/listarPresi">
                Listar Presidente
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/ListarEquipo">
                Listar Equipo
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/EditarEquipo">
                Editar Equipo
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/CrearEquipo">
                Crear Equipo
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/">
                Home
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Nav;
