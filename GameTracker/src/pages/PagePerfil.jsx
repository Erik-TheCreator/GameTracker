import React from 'react'
import "./PagePerfil.css"
import { useState } from 'react'
export const PagePerfil = () => {
    const [foto,setFoto]=useState("default.webp")
  return (
    <div>
      <h2>PagePerfil</h2>
      <img src={`../../imagens_perfil/${foto}`} alt="Foto de perfil" />
      <button onClick={() => setFoto("ryan.webp")}>Ryan</button>
      <button onClick={() => setFoto("james.jpg")}>James</button>
    </div>
    
  )
}
