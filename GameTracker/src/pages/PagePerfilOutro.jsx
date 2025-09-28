import "./PagePerfilOutro.css";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { CiBoxList } from "react-icons/ci";
import { LuLogOut } from "react-icons/lu";
import { MdKeyboardReturn } from "react-icons/md";

export const PagePerfilOutro = () => {
  const { id } = useParams(); 
  const navigate = useNavigate();
  const userIdLogado = sessionStorage.getItem("userId"); 
  const [usuario, setUsuario] = useState(null);
  const [listas, setListas] = useState([]);
  const [popupLista, setPopupLista] = useState(null);


  useEffect(() => {
    fetch(`http://localhost:3000/usuarios/usuario/${id}`, { credentials: "include" })
      .then(res => res.json())
      .then(data => setUsuario(data))
      .catch(err => console.error(err));
  }, [id]);

  useEffect(() => {
    fetch(`http://localhost:3000/listas/com-jogos/${id}`, { credentials: "include" })
      .then(res => res.json())
      .then(data => setListas(data))
      .catch(err => console.error(err));
  }, [id]);

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

  if (!usuario) return <p>Carregando...</p>;

    if (!userIdLogado) {
    navigate("/home");
    return null;
  }

  return (
    <div
      className="container-perfil"
      style={{
        backgroundImage: usuario.fotoFundo ? `url(/imagens_perfil_fundo/${usuario.fotoFundo})` : "none",
      }}
    >
      <header className="cabecalho">
        <div className="BGLogo2">
        <h1 className="logoMain">GameTracker</h1>
        </div>
        <nav>
          <ul>
            <li onClick={() => navigate("/home", { state: { userId: userIdLogado } })}>
              <span><MdKeyboardReturn /></span> Voltar
            </li>
            <li onClick={() => navigate("/mylists", { state: { userId: userIdLogado } })}>
              <span><CiBoxList /></span> Minhas Listas
            </li>
           <li onClick={handleLogout}>
  <span><LuLogOut /></span> Sair
</li>
          </ul>
        </nav>
      </header>

      <div className="BGLogo3">
        <h1>{usuario.nome}</h1>
      </div>

      <div className="perfil-box">
        <div className="perfil-barra-esquerda">
          <img
            src={`/imagens_perfil/${usuario.foto}`}
            alt="Foto de perfil"
            className="fotoperfil"
            style={{ border: usuario.bordaPerfil ? `3px solid ${usuario.bordaPerfil}` : "none" }}
          />
          

          <div className="perfil-section">
            <h3>Sobre mim</h3>
            <p>{usuario.sobre || "Este usuário ainda não escreveu nada sobre si."}</p>
          </div>

          <div className="perfil-section">
            <h3>Listas de jogos</h3>
            {listas.length === 0 ? (
              <p>Este usuário não possui listas.</p>
            ) : (
              <ul>
                {listas.map(lista => (
                  <li
                    key={lista.id}
                    onClick={() => setPopupLista(lista)}
                    style={{ cursor: "pointer", color: "rgba(237, 237, 247, 1)" }}
                  >
                    {lista.descricao} ({(lista.games || []).length})
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>

    {popupLista && (
  <div className="popupFloating2">
    <h3>{popupLista.descricao}</h3>
    {popupLista.games && popupLista.games.length > 0 ? (
      <div className="gamesPopupContainer">
        {popupLista.games.map(jogo => (
          <div key={jogo.id} className="gamePopupItem">
            <img src={`/imagens/${jogo.capa}`} alt={jogo.titulo} />
            <span>{jogo.titulo}</span>
          </div>
        ))}
      </div>
    ) : (
      <p>Lista vazia</p>
    )}
    <button onClick={() => setPopupLista(null)}>Fechar</button>
  </div>
)}


    </div>
  );
};
