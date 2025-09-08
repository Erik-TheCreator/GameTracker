import { useState } from "react"
import backGround from "../assets/bggametracker.webp";
import logoPixel from '../assets/logo_pixel.png';
import "./PageLogin.css"

export const PageLogin = ()=> {
  const [botaos, setBotaos] = useState({ email: "", senha: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBotaos((prev) => ({ ...prev, [name]: value }));
  };

  const handleEntrar = () => {
    console.log("Entrar:", botaos);
  };

  const handleCadastrar = () => {
    console.log("Cadastrar:", botaos);
  };

  return (
    <div className="container">
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
            value={botaos.email}
            onChange={handleChange}
          />

          <input
            type="password"
            name="senha"
            placeholder="Senha"
            value={botaos.senha}
            onChange={handleChange}
          />

          <button type="button" onClick={handleEntrar}>
            Entrar
          </button>

          <button type="button" onClick={handleCadastrar}>
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
