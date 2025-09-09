import "./PagePrincipal.css"
import { MdOutlineSearch,MdAddToPhotos } from "react-icons/md";
import { useState,useEffect } from "react";

export const PagePrincipal = () => {
    const [games,setGames]= useState([]);
    const [nome, setNome]= useState("");
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [selectedGame, setSelectedGame] = useState(null);
    const [listas, setListas] = useState([]);
    const [novaLista, setNovaLista] = useState(""); 

useEffect(() => {
  fetch("http://localhost:3000/gametracker", {
    credentials: "include"
  })
    .then(res => {
      if (!res.ok) throw new Error("Erro no http de games");
      return res.json();
    })
    .then(data => setGames(data))
    .catch(erro => console.log("Erro no fetch:", erro));
}, []);

  const gamesFiltrados = games.filter(game =>
  game.titulo.toLowerCase().includes(nome.toLowerCase())
);

const abrirPopup = (game) => {
  setSelectedGame(game);
  setIsPopupOpen(true);
  fetch("http://localhost:3000/lists", { credentials: "include" })
    .then(res => res.json())
    .then(data => setListas(data))
    .catch(err => console.log("Erro ao buscar listas:", err));
}

const adicionarEmLista = (listaId) => {
  fetch(`http://localhost:3000/lists/${listaId}/add`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify({ gameId: selectedGame.id }),
  })
  .then(res => {
    if(res.ok){
      alert("Jogo adicionado com sucesso!");
      setIsPopupOpen(false);
    } else {
      alert("Erro ao adicionar o jogo.");
    }
  })
  .catch(err => console.log("Erro na requisição:", err));
}

const criarNovaLista = () => {
  if(!novaLista.trim()) return alert("Nome da lista não pode ser vazio!");

  fetch("http://localhost:3000/lists", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify({ nome: novaLista }),
  })
  .then(res => res.json())
  .then(data => {
    adicionarEmLista(data.id);
  })
  .catch(err => console.log("Erro ao criar lista:", err));
}




    
  return (
        <div className="container">
          <header className="cabecalho">

          </header>
            <div className="BGLogo">
                <h1>GameTracker</h1>
            </div>
            

            <div className="containerGames">
                <form>
                    <div className="searchBar">
                    <input type="text" value={nome} onChange={(e)=> setNome(e.target.value)}/>
                    <MdOutlineSearch className="searchIcon"/>
                    </div>
                    <select name="" id="">Ano de Lançamento</select>
                    <select name="" id="">Genero</select>


                </form>

                {isPopupOpen && selectedGame && (
        <div className="popupOverlay" onClick={() => setIsPopupOpen(false)}>
          <div
            className="popupContent"
            onClick={(e) => e.stopPropagation()}
          >
            <h2>{selectedGame.titulo}</h2>

            <h3>Escolha uma lista:</h3>
            {listas.length > 0 ? (
              listas.map((lista) => (
                <button
                  key={lista.id}
                  onClick={() => adicionarEmLista(lista.id)}
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
            <button onClick={criarNovaLista}>Criar e adicionar</button>

            <button onClick={() => setIsPopupOpen(false)}>Fechar</button>
          </div>
        </div>
      )}

                

                

                <div className="gamesRow">
                  
                     {gamesFiltrados.map((game)=>(
                        <div className="games"  style={{    backgroundImage: `url(/imagens/${game.capa})`,
                          }}>
                            
                            <div className="game-title"><span>{game.titulo}</span><MdAddToPhotos className="addicon"onClick={() => abrirPopup(game)}/>
                          
                            </div>
                        </div>

                    ))}
                    
                

             
             </div>
             
                   
                    

                </div>

            </div>


   
        
  )
}
