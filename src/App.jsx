import { BrowserRouter, Routes, Route } from 'react-router-dom'
import BottomNav from './components/BottomNav'
import Inicio from './pages/Inicio'
import Personajes from './pages/Personajes'
import PersonajeDetail from './pages/PersonajeDetail'
import Mundo from './pages/Mundo'
import RegionDetail from './pages/RegionDetail'
import CasaDetail from './pages/CasaDetail'
import Fe from './pages/Fe'
import DiosDetail from './pages/DiosDetail'
import Pergamino from './pages/Pergamino'
import Cronologia from './pages/Cronologia'
import Economia from './pages/Economia'
import Buscar from './pages/Buscar'

export default function App() {
  return (
    <BrowserRouter basename="/alvathia">
      <div className="app-layout">
        <main className="page-content">
          <Routes>
            <Route path="/" element={<Inicio />} />
            <Route path="/personajes" element={<Personajes />} />
            <Route path="/personajes/:id" element={<PersonajeDetail />} />
            <Route path="/mundo" element={<Mundo />} />
            <Route path="/mundo/region/:id" element={<RegionDetail />} />
            <Route path="/mundo/casa/:id" element={<CasaDetail />} />
            <Route path="/fe" element={<Fe />} />
            <Route path="/fe/dios/:id" element={<DiosDetail />} />
            <Route path="/fe/pergamino" element={<Pergamino />} />
            <Route path="/fe/cronologia" element={<Cronologia />} />
            <Route path="/fe/economia" element={<Economia />} />
            <Route path="/buscar" element={<Buscar />} />
          </Routes>
        </main>
        <BottomNav />
      </div>
    </BrowserRouter>
  )
}
