import './App.css'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import {PageLogin} from './pages/PageLogin'
import { PagePrincipal } from './pages/PagePrincipal'
import { PageMinhasListas } from './pages/PageMinhasListas';
import { PageGame } from './pages/PageGame';
import { PagePerfil } from './pages/PagePerfil';
import { PageCadastro } from './pages/PageCadastro';
import { PagePerfilOutro } from './pages/PagePerfilOutro';

function App() {

  return (
    <Router>
    <Routes>
    <Route path="/" element={<PageLogin/>}/>
    <Route path="/signin" element={<PageCadastro/>}/>
    <Route path="/home" element={<PagePrincipal/>}/>
    <Route path="/mylists" element={<PageMinhasListas/>}/>
    <Route path="/gamepage/:id" element={<PageGame/>}/>
    <Route path="profile" element={<PagePerfil/>}/>
    <Route path="/profile/:id" element={<PagePerfilOutro />} />






  </Routes>
  </Router>
  )
}

export default App
