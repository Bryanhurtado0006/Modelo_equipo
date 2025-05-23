import './App.css'
import Crear from './components/Crear'
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
          <Route path='/crearPresi' element={<Crear></Crear>}></Route>
        </Routes>
      </Router>

    </div>
    
  )
}

export default App
