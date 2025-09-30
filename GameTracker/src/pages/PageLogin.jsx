import { useState } from "react"
import { useNavigate } from 'react-router-dom'
import "./PageLogin.css"
import { FaEye,FaEyeSlash} from "react-icons/fa";

export const PageLogin = ()=> {
  const [email,setEmail]=useState("")
  const [senha,setSenha]=useState("")
  const [mostrarSenha, setMostrarSenha] = useState(false);

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
  
      if (!res.ok) {
        alert(data.mensagem || "Usuário ou senha inválidos!");
        return;
      }
  
      alert(data.mensagem);
      sessionStorage.setItem("userId", data.user.id);
      navigate("/home", { state: { userId: data.user.id } }); 
    } catch (err) {
      console.error("Erro no login:", err);
      alert("Erro ao conectar com o servidor");
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
        <form className="painelCentral">
          <div className="text_cadastro">Login</div>

          <input
            type="email"
            name="email"
            placeholder="E-mail"
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

          <button type="button" onClick={handleLogin} className="cadastrarbtn">
            Entrar
          </button>

          <p className="cadastrarText" onClick={()=>{
            navigate("/signin");

          }}>Não possui conta? Cadastre-se</p>

      
   

        </form>
      </main>

      

    </div>

  );
};
