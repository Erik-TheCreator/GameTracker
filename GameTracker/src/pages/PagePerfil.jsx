import "./PagePerfil.css";
import { useState,useEffect } from "react";
import { useNavigate,useLocation } from "react-router-dom";
import { CiBoxList } from "react-icons/ci";
import { LuLogOut } from "react-icons/lu";
import { FaUserCircle } from "react-icons/fa";
import { MdKeyboardReturn } from "react-icons/md";
import { FaEdit } from "react-icons/fa";

export const PagePerfil = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [editprofile,setEditProfile]=useState(true)
    const [novoSobre, setNovoSobre] = useState("");
    

    const [user, setUser] = useState({
      nome: "",
      foto: "default.webp",
      sobre:"",
    });
    const userId = location.state?.userId || sessionStorage.getItem("userId");

    const [novoNome,setNovoNome]=useState("")

    const trocarFoto = async (novaFoto) => {
        try {
          const res = await fetch("http://localhost:3000/usuarios/foto", {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ foto: novaFoto }),
            credentials: "include",
          });
      
          if (!res.ok) throw new Error("Erro ao atualizar foto");
      
          const data = await res.json();
          console.log(data.mensagem);
      
          setUser((prev) => ({ ...prev, foto: novaFoto }));
        } catch (err) {
          console.error("Erro:", err);
        }
      };
      

    useEffect(() => {
  const carregarUser = async () => {
    const res = await fetch("http://localhost:3000/usuarios/me", {
      credentials: "include",
    });
    if (res.ok) {
      const data = await res.json();
      setUser({
        nome: data.nome,
        foto: data.foto || "default.webp",
        sobre: data.sobre || "",   
      });
      setNovoNome(data.nome);
      setNovoSobre(data.sobre || "");
    }
  };

  carregarUser();
}, []);

const salvarPerfil = async () => {
  try {
    const res = await fetch("http://localhost:3000/usuarios", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ nome: novoNome || user.nome, sobre: novoSobre }),
    });

    const data = await res.json();

    if (!res.ok) {
      alert(data.mensagem || "Erro ao atualizar perfil."); 
      return;
    }

    alert("Perfil atualizado com sucesso!"); 
    setUser((prev) => ({ ...prev, nome: novoNome || prev.nome, sobre: novoSobre }));
    setEditProfile(true); 
  } catch (err) {
    console.error(err);
    alert("Erro no servidor."); 
  }
};




    

 
    return (
        <div className="container-perfil" >
            <header className="cabecalho">
        <nav>
          <ul>
          <li onClick={() => navigate("/home", { state: { userId } })}>
          <span><MdKeyboardReturn /></span> Voltar </li>
            <li onClick={() => navigate("/mylists", { state: { userId } })}>
              <span><CiBoxList /></span> Minhas Listas
            </li>
       
            <li onClick={() => navigate("/", { state: { userId } })}>
              <span><LuLogOut /></span> Logout
            </li>
          </ul>
        </nav>
      </header>
 
 
            <div className="BGLogo">
                <h1>Meu Perfil</h1>
            </div>
 
            <div className="perfil-box" style={{ width: editprofile ? "35%" : "60%" ,
            height: editprofile ? "1000px" : "2100px" 
            }} >


                {editprofile ? (

                <div className="perfil-barra-esquerda">
                <img src={`/imagens_perfil/${user.foto}`} alt="Foto de perfil" className='fotoperfil' />
                    <h2 className="perfil-nome">{user.nome}</h2>
                    <div className="perfil-section">
                        <h3>Sobre mim</h3>
                        <p>{user.sobre || "Ainda não escreveu nada sobre você."}</p>
                    </div>
                    <button  onClick={(e)=> setEditProfile(false) }><FaEdit className="editprofileicon"/>
Editar</button>
                </div>

) : (

    <div className="editProfileContainer">

        <img src={`/imagens_perfil/${user.foto}`} alt="Foto de perfil" className='fotoperfil' />

        <input type="text" placeholder={user.nome} value={novoNome}  onChange={(e) => setNovoNome(e.target.value)}/>
        <div className="perfil-section">
                        <h3>Sobre mim</h3>
                        <textarea 
      value={novoSobre} 
      onChange={(e) => setNovoSobre(e.target.value)} 
      placeholder="Escreva sobre você..."
    />
                    </div>

        <div className="imagesRow">
        <img src="imagens_perfil/arthur.jpg" alt="" className="fotos" onClick={() => trocarFoto("arthur.jpg")}/>
        <img src="imagens_perfil/james.jpg" alt="" className="fotos" onClick={() => trocarFoto("james.jpg")}/>
        <img src="imagens_perfil/kratos.jpg" alt="" className="fotos" onClick={() => trocarFoto("kratos.jpg")}/>
        <img src="imagens_perfil/leon.jpg" alt="" className="fotos" onClick={() => trocarFoto("leon.jpg")}/>
        <img src="imagens_perfil/spiderman.png" alt="" className="fotos" onClick={() => trocarFoto("spiderman.png")}/>
        </div>
        <div className="imagesRow2">
        <img src="imagens_perfil/sadie.avif" alt="" className="fotos" onClick={() => trocarFoto("sadie.avif")}/>
        <img src="imagens_perfil/chunli.jpg" alt="" className="fotos" onClick={() => trocarFoto("chunli.jpg")}/>
        <img src="imagens_perfil/ellie.jpg" alt="" className="fotos" onClick={() => trocarFoto("ellie.jpg")}/>
        <img src="imagens_perfil/jill.png" alt="" className="fotos" onClick={() => trocarFoto("jill.png")}/>
        <img src="imagens_perfil/laracroft.jpg" alt="" className="fotos" onClick={() => trocarFoto("laracroft.jpg")}/>
            

        </div>



      
   <button onClick={salvarPerfil}>Salvar Mudanças</button>
   <p onClick={(e)=>{
    setEditProfile(true)
   }}>Voltar</p>

    </div>
)}
 
             
            </div>
        </div>
    );
};