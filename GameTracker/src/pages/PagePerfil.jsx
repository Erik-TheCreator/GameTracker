import "./PagePerfil.css";
import { useState,useEffect } from "react";
import { useNavigate,useLocation } from "react-router-dom";
import { CiBoxList } from "react-icons/ci";
import { LuLogOut } from "react-icons/lu";
import { FaUserCircle } from "react-icons/fa";
import { MdKeyboardReturn } from "react-icons/md";

export const PagePerfil = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [editprofile,setEditProfile]=useState(true)
    const [foto,setFoto]=useState("default.webp")
    

    const [user, setUser] = useState({
      nome: "",
      foto: "default.webp",
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
          });
        }
      };
    
      carregarUser();
    }, []);
    

 
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
            <li onClick={() => navigate("/profile", { state: { userId } })}> <span><FaUserCircle />
            </span> Perfil</li>
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
                        <p>O mestre dos games, hunter eyes, six pack, gorilla hands, positive canthal tilt, canguru legs</p>
                    </div>
                    <button  onClick={(e)=> setEditProfile(false) }>Editar</button>
                </div>

) : (

    <div className="editProfileContainer"> 
        <img src={`/imagens_perfil/${user.foto}`} alt="Foto de perfil" className='fotoperfil' />
        <input type="text" placeholder={user.nome}/>
        <div className="perfil-section">
                        <h3>Sobre mim</h3>
                        <textarea name="" id=""></textarea>
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



      
    <button  onClick={(e)=> setEditProfile(true) }>Salvar Mudanças</button>

    </div>
)}
 
             
            </div>
        </div>
    );
};