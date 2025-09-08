import './App.css'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import {PageLogin} from './pages/PageLogin'
import { PagePrincipal } from './pages/PagePrincipal'
function App() {

  return (
    <Router>
    <Routes>
    <Route path="/" element={<PageLogin/>}/>
    <Route path="/home" element={<PagePrincipal/>}/>
  </Routes>
  </Router>
  )
}

export default App
