import "./PagePerfil.css";
import { useState,useEffect } from "react";
import { useNavigate,useLocation } from "react-router-dom";
import { GrAdd } from "react-icons/gr";
import { MdKeyboardReturn } from "react-icons/md";
 
export const PagePerfil = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const [user, setUser] = useState({
      nome: "",
      foto: "default.webp",
    });

    const userId = location.state?.userId || sessionStorage.getItem("userId");


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
        <div className="container-perfil">
 
            <button
                className="botao_voltar"
                onClick={(e)=> navigate("/home", { state: { userId } })}>
                <span><MdKeyboardReturn /></span>Voltar
            </button>
 
            <div className="LogoP">
                <h1>Meu Perfil</h1>
            </div>
 
            <div className="perfil-box">
                <div className="perfil-barra-esquerda">
                <img src={`/imagens_perfil/${user.foto}`} alt="Foto de perfil" className='imagensperfil' />
                    <h2 className="perfil-nome">{user.nome}</h2>
                    <p className="perfil-nivel">Nível 1</p>
                    <p className="perfil-pontos">⭐ 100 pts</p>
                </div>
 
                <div className="perfil-barra-direita">
 
                    <div className="perfil-section">
                        <h3>Sobre mim</h3>
                        <p>Apaixonado por RPGs e indies. Sempre em busca de novas histórias.</p>
                    </div>
 
                    <div className="perfil-section">
                        <h3>Últimas Avaliações</h3>
                        <ul>
                            <li>Baldur's Gate 3 — ⭐ 4/5</li>
                            <li>Cyberpunk 2077 — ⭐ 3/5</li>
                            <li>Stardew Valley — ⭐ 2/5</li>
                        </ul>
                    </div>
                    <div className="game_fav_text">Games Favoritos
                        <div className="game_fav" onClick={()=>navigate("/mylists")}>
                            <GrAdd />
                        </div>
                    </div>
                    <button  onClick={(e)=> navigate("/editprofile", { state: { userId } })}>Editar</button>
                </div>
            </div>
        </div>
    );
};