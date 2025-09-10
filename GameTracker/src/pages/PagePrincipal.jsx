import "./PagePrincipal.css";
import { MdOutlineSearch, MdAddToPhotos } from "react-icons/md";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";


export const PagePrincipal = () => {
  const location = useLocation();
  const userId = location.state?.userId;
  const [games, setGames] = useState([]);
  const [nome, setNome] = useState("");
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [selectedGame, setSelectedGame] = useState(null);
  const [listas, setListas] = useState([]);
  const [novaLista, setNovaLista] = useState("");
  const [popupPosition, setPopupPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    fetch("http://localhost:3000/gametracker", { credentials: "include" })
      .then(res => {
        if (!res.ok) throw new Error("Erro ao buscar games");
        return res.json();
      })
      .then(data => setGames(data))
      .catch(err => console.log(err));
  }, []);

  const gamesFiltrados = games.filter(game =>
    game.titulo.toLowerCase().includes(nome.toLowerCase())
  );

  const abrirPopup = (game, event) => {
    setSelectedGame(game);
    setIsPopupOpen(true);

    const rect = event.currentTarget.getBoundingClientRect();
    setPopupPosition({
      x: rect.right + 10,
      y: rect.top,
    });

    fetch(`http://localhost:3000/listas/${userId}`, { credentials: "include" })
      .then(res => res.json())
      .then(data => setListas(data))
      .catch(err => console.log(err));
  };

  const adicionarEmLista = 
  (descricaoLista) => {
    fetch("http://localhost:3000/listas", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({
        id_usuario: userId,
        id_game: selectedGame.id,
        descricao: descricaoLista,
      }),
    })
      .then(res => {
        if (res.ok) {
          alert("Jogo adicionado com sucesso!");
          setIsPopupOpen(false);
        } else {
          alert("Erro ao adicionar o jogo.");
        }
      })
      .catch(err => console.log(err));
  };

  const criarNovaLista = () => {
    if(!novaLista.trim()) return alert("Nome da lista não pode ser vazio!");
  
    fetch("http://localhost:3000/listas", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({
        id_usuario: userId,
        id_game: selectedGame.id,
        descricao: novaLista
      }),
    })
    .then(res => {
      if(res.ok){
        alert("Lista criada e jogo adicionado!");
        setIsPopupOpen(false);
        setNovaLista(""); 
      } else {
        alert("Erro ao criar a lista");
      }
    })
    .catch(err => console.log(err));
  }
  

  return (
    <div className="container">
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
            style={{ top: popupPosition.y, left: popupPosition.x }}
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
            <button onClick={(e) => { e.preventDefault(); criarNovaLista(); }}>Criar e adicionar</button>

            <button onClick={() => setIsPopupOpen(false)}>Fechar</button>
          </div>
        )}

        <div className="gamesRow">
          {gamesFiltrados.map((game) => (
            <div
              className="games"
              key={game.id}
              style={{ backgroundImage: `url(/imagens/${game.capa})` }}
            >
              <div className="game-title">
                <span>{game.titulo}</span>
                <MdAddToPhotos
                  className="addicon"
                  onClick={(e) => abrirPopup(game, e)}
                />
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};
