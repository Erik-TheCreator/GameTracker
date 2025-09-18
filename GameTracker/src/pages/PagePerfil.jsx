import React from 'react'
import "./PagePerfil.css"
import { useState,useEffect } from 'react'
export const PagePerfil = () => {
    const [foto,setFoto]=useState("default.webp")
    const trocarFoto = async (novaFoto) => {
      setFoto(novaFoto);
      try {
        const res = await fetch("http://localhost:3000/usuarios/foto", {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ foto: novaFoto }),
          credentials: "include", 
        });
    
        if (!res.ok) throw new Error("Erro ao atualizar foto");
    
        const data = await res.json();
        console.log(data.mensagem);
      } catch (err) {
        console.error("Erro:", err);
      }
    };

    useEffect(() => {
      const carregarFoto = async () => {
        const res = await fetch("http://localhost:3000/usuarios/me", {
          credentials: "include",
        });
        if (res.ok) {
          const data = await res.json();
          setFoto(data.foto_perfil || "default.webp");
        }
      };
    
      carregarFoto();
    }, []);
    
    
  return (
    <div>
      <h2>PagePerfil</h2>
      <img src={`/imagens_perfil/${foto}`} alt="Foto de perfil" className='imagensperfil' />
      <button onClick={() => trocarFoto("ryan.webp")}>Ryan</button>
      <button onClick={() => trocarFoto("james.jpg")}>James</button>
    </div>
    
  )
}
