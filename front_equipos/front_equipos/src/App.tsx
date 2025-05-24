import './App.css'
import Home from './Home'
import Crear from './Crear'
import ListarEquipo from './ListarEquipo'
import EditarEquipo from './EditarEquipo'
import CrearEquipo from './CrearEquipo'
import { Routes } from 'react-router-dom'
import { BrowserRouter as Router} from 'react-router-dom'
import { Route } from 'react-router-dom'
import Nav from './components/Nav'

function App() {
  return (
    <div>
      <Router>
        <Nav></Nav>
        <Routes>

          <Route path='/' element={<Home></Home>}></Route>
          <Route path='/crearPresi' element={<Crear></Crear>}></Route>


          
          <Route path='/ListarEquipo' element={<ListarEquipo></ListarEquipo>}></Route>
          <Route path='/EditarEquipo' element={<EditarEquipo></EditarEquipo>}></Route>
          <Route path='/CrearEquipo' element={<CrearEquipo></CrearEquipo>}></Route>
        </Routes>
      </Router>

    </div>
    
  )
}

export default App
