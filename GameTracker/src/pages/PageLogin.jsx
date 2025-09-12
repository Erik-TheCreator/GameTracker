import { useState } from "react"
import { useNavigate } from 'react-router-dom'
import backGround from "../assets/bggametracker.webp";
import logoPixel from '../assets/logo_pixel.png';
import "./PageLogin.css"

export const PageLogin = ()=> {
  const [email,setEmail]=useState("")
  const [senha,setSenha]=useState("")
  const navigate=useNavigate()

  const handleLogin = async () => {
    try {
      const res = await fetch("http://localhost:3000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ email, senha }),
      });
  
      const data = await res.json();
      console.log("Resposta do backend:", data);
  
      if (!res.ok) {
        alert(data.mensagem || "Usuário ou senha inválidos!");
        return;
      }
  
      alert(data.mensagem);
      sessionStorage.setItem("userId", data.id);
      navigate("/home", { state: { userId: data.user.id } }); 
    } catch (err) {
      console.error("Erro no login:", err);
      alert("Erro ao conectar com o servidor");
    }
  };


  return (
    <div className="container2">
      <header className="logo">
        <img src={logoPixel} alt="Logo Pixel" />
      </header>

      <main>
        <div className="backGround">

        </div>

        <form className="painelCentral">

          <input
            type="email"
            name="email"
            placeholder="E-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            name="senha"
            placeholder="Senha"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
          />

          <button type="button" onClick={handleLogin}>
            Entrar
          </button>

          <button type="button">
            Cadastrar
          </button>

        </form>
      </main>

      <div className="barra_embaixo">
          <footer>
            <div className="texto_embaixo">
              <h3> Contatos </h3>
              <h3> Suporte </h3>
              <h3> Termos </h3>
              <h3> Privacidade </h3>
            </div>
            
            <div className="texto_abaixo">
            <h4>Texto abaixo apsosskjgaksga</h4>
            </div>
            
          </footer>
      </div>

    </div>

  );
}
