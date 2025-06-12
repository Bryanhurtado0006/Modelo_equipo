import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";

import Nav from "./components/Nav";
import Home from "./Home";
import Crear from "./Crear";
import ListarEquipo from "./ListarEquipo";
import EditarEquipo from "./EditarEquipo";
import CrearEquipo from "./CrearEquipo";
import Editar from "./Editar";
import Listado from "./Listado";
import Login from "./Login";
import Register from "./Register";
import "./App.css"

const App: React.FC = () => {
  const [auth, setAuth] = useState<boolean>(false);

  useEffect(() => {
    const estado = localStorage.getItem("auth");
    setAuth(estado === "true");
  }, []);

  return (
    <Router>
      {auth && <Nav />} {/* Solo se muestra la Nav si está logeado */}

      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={auth ? <Home /> : <Login />} />
        <Route path="/crearPresi" element={<Crear />} />
        <Route path="/actualizar" element={<Editar />} />
        <Route path="/listarPresi" element={<Listado />} />
        <Route path="/listarEquipo" element={<ListarEquipo />} />
        <Route path="/editarEquipo" element={<EditarEquipo />} />
        <Route path="/crearEquipo" element={<CrearEquipo />} />
      </Routes>
    </Router>
  );
};

export default App;
