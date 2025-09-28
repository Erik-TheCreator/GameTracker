import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./PageMinhasListas.css"; 
import { LuLogOut } from "react-icons/lu";
import { FaTrash } from "react-icons/fa";
import { MdKeyboardReturn, MdEdit } from "react-icons/md";
import { IoIosArrowDown } from "react-icons/io";
import { IoTrashBin } from "react-icons/io5";
import { FaUserAlt } from "react-icons/fa";

export const PageMinhasListas = () => {
  const navigate = useNavigate();
  const userId = sessionStorage.getItem("userId");
  const [listas, setListas] = useState([]);
  const [popupAberto, setPopupAberto] = useState(false);
  const [tipoPopup, setTipoPopup] = useState(""); 
  const [popupData, setPopupData] = useState({});
  const [novoNome, setNovoNome] = useState("");
  const [listasAbertas, setListasAbertas] = useState([]);
  const [fundoUsuario, setFundoUsuario] = useState("img.webp");
  const [fotoUsuario, setFotoUsuario] = useState("");
  const [nomeUsuario, setNomeUsuario] = useState("");
  const [bordaUsuario,setBordaPerfil]=useState("")
  const capitalizeWords = (str) => {
  return str
    .split(" ")
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};


const toggleLista = (id) => {
  if (listasAbertas.includes(id)) {
    setListasAbertas(listasAbertas.filter((i) => i !== id));
  } else {
    setListasAbertas([...listasAbertas, id]);
  }
};


  const carregarListas = () => {
    fetch(`http://localhost:3000/listas/com-jogos/${userId}`, { credentials: "include" })
      .then(res => res.json())
      .then(data => setListas(data))
      .catch(err => console.log(err));
  };

  useEffect(() => {
    if (userId) carregarListas();
  }, [userId]);

  useEffect(() => {
  const carregarFundo = async () => {
    try {
      const res = await fetch("http://localhost:3000/usuarios/me", {
        credentials: "include",
      });
      const data = await res.json();
      console.log(data)
      setFundoUsuario(data.fotoFundo || "img.webp");
      setFotoUsuario(data.foto)
      setNomeUsuario(data.nome)
      setBordaPerfil(data.bordaPerfil)
    } catch (err) {
      console.error("Erro ao carregar fundo do usuário:", err);
    }
  };

  carregarFundo();
}, []);

  const deletarLista = async (id) => {
    try {
      await fetch(`http://localhost:3000/listas/${id}`, {
        method: "DELETE",
        credentials: "include"
      });
      carregarListas();
      setPopupAberto(false);
    } catch (err) {
      console.error(err);
    }
  };

 const atualizarLista = async (id) => {
  const nomeTrim = novoNome.trim();

  if (!nomeTrim) {
    alert("O nome da lista não pode ficar vazio!");
    return;
  }

  try {
    await fetch(`http://localhost:3000/listas/${id}`, {  
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ descricao: nomeTrim })
    });
    carregarListas();
    setPopupAberto(false);
    setNovoNome("");
  } catch (err) {
    console.error(err);
    alert("Erro ao atualizar lista");
  }
};

  
  

  const deletarJogo = async (listaId, jogoId) => {
    try {
      await fetch(`http://localhost:3000/listas/${listaId}/jogo/${jogoId}`, {
        method: "DELETE",
        credentials: "include"
      });
      carregarListas();
      setPopupAberto(false);
    } catch (err) {
      console.error(err);
    }
  };

   const handleLogout = async () => {
  try {
    await fetch("http://localhost:3000/usuarios/logout", {
      method: "POST",
      credentials: "include"
    });
    sessionStorage.removeItem("userId");
    navigate("/"); 
  } catch (err) {
    console.error("Erro ao deslogar:", err);
  }
};

  if (!userId) {
    navigate("/home");
    return null;
  }

  return (
    <div className="container" style={{
    backgroundImage: `url(/imagens_perfil_fundo/${fundoUsuario})`}}>
      
      <header className="cabecalho">
        <div className="BGLogo2">
        <h1 className="logoMain">GameTracker</h1>
        </div>
        <nav>
          <ul>
            <li onClick={() => navigate("/home", { state: { userId } })}>
              <span><MdKeyboardReturn /></span> Voltar
            </li>
            <li onClick={() => navigate("/profile", { state: { userId } })}> <span>  <img 
  src={`/imagens_perfil/${fotoUsuario}`} 
  alt="Foto de perfil" 
  className='fotoperfilpagemain'
   style={{
    border: bordaUsuario ? `2px solid ${bordaUsuario}` : "none"
  }}
/>

            </span>{nomeUsuario}</li>
          <li onClick={handleLogout}>
  <span><LuLogOut /></span> Sair
</li>
          </ul>
        </nav>
      </header>
          <div className="BGLogo">
        
      </div>



      <div className="containerGames2">
        {listas.length === 0 ? (
          <p className="listavazia">Você ainda não tem listas.</p>
        ) : (

        

          listas.map((lista) => (
            <div key={lista.id} className="gamesContainer">
              <div>
                <IoIosArrowDown className={`seta ${listasAbertas.includes(lista.id) ? "aberta" : ""}`}
                onClick={() =>{
                toggleLista(lista.id)}}/>

              <h2 className="nomedalista" onClick={() =>{
                toggleLista(lista.id)}}>
                {lista.descricao} 
              </h2>
              
              
               <span>
                  <IoTrashBin 
                  className="trashiconlist"
                    onClick={() => {
                      setPopupAberto(true);
                      setTipoPopup("deletarLista");
                      setPopupData({ id: lista.id });
                    }}
                  />
                </span>
                <span>
                  <MdEdit
                  className="editicon"
                    
                    onClick={() => {
                      setPopupAberto(true);
                      setTipoPopup("editarLista");
                      setPopupData({ id: lista.id, nome: lista.descricao });
                    }}
                  />
                </span>
                </div>
              
 {listasAbertas.includes(lista.id) && (
              <div className="gamesRow2">
                {lista.games && lista.games.length > 0 ? (
                  lista.games.map((game) => (
                    <div
                      className="games2"
                      key={game.id}
                      style={{ backgroundImage: `url(/imagens/${game.capa})` }}
                      onClick={() => {
                        sessionStorage.setItem("scrollPosition", window.scrollY);
                        navigate(`/gamepage/${game.id}`, { state: { userId } })}}
                    >
                      <div className="game-title2">
                        <p>{game.titulo}</p>
                        <div>
                        <span><FaTrash
                          className="trashicon"
                          onClick={(e) => {
                            e.stopPropagation()
                            setPopupAberto(true);
                            setTipoPopup("deletarJogo");
                            setPopupData({ id: game.id, listaId: lista.id });
                          }}
                        /></span></div>
                      </div>
                    </div>
                  ))
                ) : (
                  <p>Nenhum jogo nesta lista</p>
                )}
              </div>
              )}
            </div>
          ))
        )}
      </div>

      {popupAberto && (
        <div className="popupOverlay" onClick={() => setPopupAberto(false)}>
          <div className="popupFloating" onClick={(e) => e.stopPropagation()}>
            {tipoPopup === "deletarLista" && (
              <>
                <h3>Deseja excluir esta lista?</h3>
                <button onClick={() => deletarLista(popupData.id)}>Confirmar</button>
                <button onClick={() => setPopupAberto(false)}>Cancelar</button>
              </>
            )}

            {tipoPopup === "editarLista" && (
              <>
                <h3>Editar nome da lista</h3>
                <input
                  className="inputList"
                  type="text"
                  value={novoNome}
                  onChange={(e) => setNovoNome(capitalizeWords(e.target.value))}
                  placeholder={popupData.nome}
                />
                <button onClick={() => atualizarLista(popupData.id)}>Confirmar</button>
                <button onClick={() => setPopupAberto(false)}>Cancelar</button>
              </>
            )}

            {tipoPopup === "deletarJogo" && (
              <>
                <h3>Deseja excluir este jogo da lista?</h3>
                <button onClick={() => deletarJogo(popupData.listaId, popupData.id)}>Confirmar</button>
                <button onClick={() => setPopupAberto(false)}>Cancelar</button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
