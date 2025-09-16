import './App.css'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import {PageLogin} from './pages/PageLogin'
import { PagePrincipal } from './pages/PagePrincipal'
import { PageMinhasListas } from './pages/PageMinhasListas';
import { PageGame } from './pages/PageGame';
import { PagePerfil } from './pages/PagePerfil';
function App() {

  return (
    <Router>
    <Routes>
    <Route path="/" element={<PageLogin/>}/>
    <Route path="/home" element={<PagePrincipal/>}/>
    <Route path="/mylists" element={<PageMinhasListas/>}/>
    <Route path="/gamepage/:id" element={<PageGame/>}/>
      <Route path="profile" element={<PagePerfil/>}/>



  </Routes>
  </Router>
  )
}

export default App
