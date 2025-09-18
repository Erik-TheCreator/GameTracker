import './App.css'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import {PageLogin} from './pages/PageLogin'
import { PagePrincipal } from './pages/PagePrincipal'
import { PageMinhasListas } from './pages/PageMinhasListas';
import { PageGame } from './pages/PageGame';
import { PagePerfil } from './pages/PagePerfil';
import { PageEditPerfil } from './pages/PageEditPerfil';
function App() {

  return (
    <Router>
    <Routes>
    <Route path="/" element={<PageLogin/>}/>
    <Route path="/home" element={<PagePrincipal/>}/>
    <Route path="/mylists" element={<PageMinhasListas/>}/>
    <Route path="/gamepage/:id" element={<PageGame/>}/>
    <Route path="profile" element={<PagePerfil/>}/>
    <Route path="editprofile" element={<PageEditPerfil/>}/>



  </Routes>
  </Router>
  )
}

export default App
