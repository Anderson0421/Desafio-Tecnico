import { BrowserRouter as Router, Routes, Route, } from 'react-router-dom'
import Home from './pages/Home'
import DetailAlumno from './pages/DetailAlumno'
import EditAlumno from './pages/EditAlumno'
import CrearAlumno from './pages/CrearAlumno'
import Registros from './pages/Registros'
import Carreras from './pages/Carreras'
import CrearCarrera from './pages/CrearCarrera'
import DetailCarrera from './pages/DetailCarrera'
import EditCarreras from './pages/EditCarreras'

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/alumnos/detail/:id/" element={<DetailAlumno/>} />
          <Route path="/alumnos/edit/:id/" element={<EditAlumno/>} />
          <Route path="/alumnos/crear/" element={<CrearAlumno/>} />

          <Route path="/registros" element={<Registros />} />
          <Route path="/carreras" element={<Carreras />} />
          <Route path="/carreras/crear/" element={<CrearCarrera />} />
          <Route path="/carreras/detail/:id/" element={<DetailCarrera />} />
          <Route path="/carreras/edit/:id/" element={<EditCarreras />} />
          
        </Routes>
      </Router>
    </>
  )
}

export default App
