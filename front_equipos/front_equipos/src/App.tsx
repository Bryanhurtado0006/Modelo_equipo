// src/App.tsx
import './App.css';
import Home from './Home';
import Crear from './Crear';
import ListarEquipo from './ListarEquipo';
import EditarEquipo from './EditarEquipo';
import CrearEquipo from './CrearEquipo';
import Editar from './Editar';
import Listado from './Listado';
import { Routes, Route, BrowserRouter as Router } from 'react-router-dom';
import Nav from './components/Nav';

function App() {
    return (
        <div>
            <Router>
                <Nav />
                <Routes>
                    <Route path='/' element={<Home />} />
                    <Route path='/crearPresi' element={<Crear />} />
                    <Route path='/actualizar' element={<Editar />} />
                    <Route path='/listarPresi' element={<Listado />} />
                    <Route path='/ListarEquipo' element={<ListarEquipo />} />
                    <Route path='/EditarEquipo' element={<EditarEquipo />} />
                    <Route path='/CrearEquipo' element={<CrearEquipo />} />
                </Routes>
            </Router>
        </div>
    );
}

export default App;