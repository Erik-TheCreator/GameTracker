import "./PagePrincipal.css";
import { MdOutlineSearch, MdAddToPhotos } from "react-icons/md";
import { CiBoxList } from "react-icons/ci";
import { LuLogOut } from "react-icons/lu";
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";

export const PagePrincipal = () => {
  const location = useLocation();
  const userId = location.state?.userId || sessionStorage.getItem("userId");
  const navigate = useNavigate();
  const [games, setGames] = useState([]);
  const [nome, setNome] = useState("");
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [selectedGame, setSelectedGame] = useState(null);
  const [listas, setListas] = useState([]);
  const [novaLista, setNovaLista] = useState("");
  const [popupPosition, setPopupPosition] = useState({ x: 0, y: 0 });

  if (!userId) {
    navigate("/home");
    return null;
  }

  useEffect(() => {
    fetch("http://localhost:3000/gametracker", { credentials: "include" })
      .then((res) => res.json())
      .then((data) => setGames(data))
      .catch((err) => console.log(err));
  }, []);

  const ordemAlfabetica=(gamesList)=>{
    return [...gamesList].sort((a,b)=>a.titulo.localeCompare(b.titulo))
  }
  const gamesFiltrados = ordemAlfabetica(games.filter((game) =>
    game.titulo.toLowerCase().includes(nome.toLowerCase())
  ));


  const carregarListas = async () => {
    try {
      const res = await fetch(`http://localhost:3000/listas/${userId}`, {
        credentials: "include",
      });
      const data = await res.json();
      const listasUnicas = [...new Map(data.map(item => [item.descricao, item])).values()];
      setListas(listasUnicas);
    } catch (err) {
      console.error("Erro ao carregar listas:", err);
    }
  };
  
  const abrirPopup = (game) => {
    setSelectedGame(game);
    setIsPopupOpen(true);
    carregarListas(); 
  };
  
  const adicionarEmLista = async (descricaoLista) => {
    try {
      const res = await fetch("http://localhost:3000/listas", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          id_usuario: userId,
          id_game: selectedGame.id,
          descricao: descricaoLista,
        }),
      });
  
      if (!res.ok) {
        const data = await res.json();
        alert(data.mensagem || "Erro ao adicionar o jogo.");
        return;
      }
  
      await carregarListas(); 
      alert(`Jogo adicionado à lista "${descricaoLista}" com sucesso!`);
      setIsPopupOpen(false);
    } catch (err) {
      console.error(err);
    }
  };
  
  const criarNovaLista = async () => {
    if (!novaLista.trim()) return alert("O nome da lista não pode ser vazio!");
    try {
      const res = await fetch("http://localhost:3000/listas", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          id_usuario: userId,
          id_game: selectedGame.id,
          descricao: novaLista.trim(),
        }),
      });
  
      if (!res.ok) {
        const data = await res.json();
        alert(data.mensagem || "Erro ao criar a lista.");
        return;
      }
  
      await carregarListas();
      setNovaLista("");
      setIsPopupOpen(false);
      alert("Lista criada e jogo adicionado com sucesso!");
    } catch (err) {
      console.error(err);
      alert("Erro ao criar a lista.");
    }
  };

  useEffect(() => {
    if (games.length > 0) {
      const savedPosition = sessionStorage.getItem("scrollPosition");
      if (savedPosition) {
        window.scrollTo(0, parseInt(savedPosition));
        sessionStorage.removeItem("scrollPosition");
      }
    }
  }, [games]);
  

  

  

 
  

  return (
    <div className="container">
      <header className="cabecalho">
        <nav>
          <ul>
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
        <h1>GameTracker</h1>
      </div>

      <div className="containerGames">
        <form>
          <div className="searchBar">
            <input
              type="text"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              placeholder="Buscar jogos..."
            />
            <MdOutlineSearch className="searchIcon" />
          </div>
        </form>

        {isPopupOpen && selectedGame && (
          <div
            className="popupFloating"
          >
            <h2>{selectedGame.titulo}</h2>

            <h3>Escolha uma lista:</h3>
            {listas.length > 0 ? (
              listas.map((lista) => (
                <button
                  key={lista.id}
                  onClick={() => adicionarEmLista(lista.descricao)}
                >
                  {lista.descricao}
                </button>
              ))
            ) : (
              <p>Você ainda não tem listas.</p>
            )}

            <h3>Criar nova lista:</h3>
            <input
              type="text"
              value={novaLista}
              onChange={(e) => setNovaLista(e.target.value)}
              placeholder="Nome da nova lista"
            />
            <button
              onClick={(e) => {
                e.preventDefault();
                criarNovaLista();
              }}
            >
              Criar e adicionar
            </button>

            <button onClick={() => setIsPopupOpen(false)}>Fechar</button>
          </div>
        )}

        <div className="gamesRow">
          {gamesFiltrados.map((game) => (
            <div
              className="games"
              key={game.id}
              style={{ backgroundImage: `url(/imagens/${game.capa})` }}
              onClick={() => {
                sessionStorage.setItem("scrollPosition", window.scrollY);
                navigate(`/gamepage/${game.id}`, { state: { userId } })}}
            >
              <div className="game-title">
                <span>{game.titulo}</span>
                <MdAddToPhotos
                  className="addicon"
                  onClick={(e) => {
                    e.stopPropagation()
                    abrirPopup(game, e)}}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
