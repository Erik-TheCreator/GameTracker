import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./PageCadastro.css";
import { FaEye,FaEyeSlash} from "react-icons/fa";
import instagramlogo from "../assets/instagram.png"

export const PageCadastro = () => {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmarsenha, setConfirmarSenha] = useState("");
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const [mostrarConfirmarSenha, setMostrarConfirmarSenha] = useState(false);


  const navigate = useNavigate();

  const handlecadastro = async () => {
    if (senha !== confirmarsenha) {
      alert("As senhas não conferem!");
      return;
    }

    try {
      const resposta = await fetch("http://localhost:3000/usuarios", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nome, email, senha }),
      });

      const dados = await resposta.json();

      if (resposta.ok) {
        alert("Usuário cadastrado com sucesso!");
        setTimeout(() => navigate("/"), 1500);
      } else {
        alert(dados.erro || "Erro ao cadastrar usuário.");
      }
    } catch (err) {
      console.error(err);
      alert("Erro no servidor.");
    }
  };

  return (
    <div className="container2">
      <header className="logo">
         <div>
        <h1>GameTracker</h1>
      </div>
        
      </header>

      <main>
        <form className="painelCentralCadastro" onSubmit={(e) => e.preventDefault()}>
          <div className="text_cadastro">Cadastro</div>

          <input
            type="text"
            name="nome"
            placeholder="Criar Nome de usuário"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
          />

          <input
            type="email"
            name="email"
            placeholder="Seu E-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <div className="senha-container">
            <input
              type={mostrarSenha ? "text" : "password"}
              name="senha"
              placeholder="Criar Senha"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
            />
            <button
              type="button"
              className="botaoMostrarSenha"
              onClick={() => setMostrarSenha(!mostrarSenha)}
            >
              {mostrarSenha ? <FaEye /> : <FaEyeSlash />}
            </button>
          </div>

          <div className="senha-container">
            <input
              type={mostrarConfirmarSenha ? "text" : "password"}
              name="confirmarSenha"
              placeholder="Confirmar Senha"
              value={confirmarsenha}
              onChange={(e) => setConfirmarSenha(e.target.value)}
            />
            <button
              type="button"
              className="botaoMostrarSenha"
              onClick={() => setMostrarConfirmarSenha(!mostrarConfirmarSenha)}
            >
              {mostrarConfirmarSenha ? <FaEye /> : <FaEyeSlash />}
            </button>
          </div>

          <button type="button" onClick={handlecadastro} className="cadastrarbtn">
            Cadastrar
          </button>

          <button type="button" onClick={() => navigate("/")}
            className="cadastrarbtn">
            Cancelar
          </button>
          
        </form>
      </main>
         <footer className="footerLogin">
            <div className="coluna">
              <h1>Instagram dos criadores do site!</h1>
              <div className="footerInsta">
              <a href="https://www.instagram.com/eduarduuh__/" target="blank">
              <img src={instagramlogo} alt=""/>Eduardo
              </a>
              <a href="https://www.instagram.com/erik_thecreator/" target="blank">
              <img src={instagramlogo} alt=""/>Erik
              </a>
              <a href="" target="blank">
              <img src={instagramlogo} alt=""/>Miguel Oliveira
              </a>
              </div>
            </div>
           </footer>
    </div>
  );
};
