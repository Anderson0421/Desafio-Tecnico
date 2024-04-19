import { BrowserRouter as Router, Routes, Route, } from 'react-router-dom'
import Home from './pages/Home'
import DetailAlumno from './pages/DetailAlumno'
import EditAlumno from './pages/EditAlumno'
import CrearAlumno from './pages/CrearAlumno'

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/alumnos/detail/:id/" element={<DetailAlumno/>} />
          <Route path="/alumnos/edit/:id/" element={<EditAlumno/>} />
          <Route path="/alumnos/crear/" element={<CrearAlumno/>} />
        </Routes>
      </Router>
    </>
  )
}

export default App
