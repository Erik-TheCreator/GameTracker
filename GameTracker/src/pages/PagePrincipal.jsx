import "./PagePrincipal.css";
import { MdOutlineSearch, MdAddToPhotos } from "react-icons/md";
import { CiBoxList } from "react-icons/ci";
import { LuLogOut } from "react-icons/lu";
import { useState, useEffect} from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FaFilter } from "react-icons/fa";
import { MdFormatListBulletedAdd } from "react-icons/md";


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
  const [generos, setGeneros] = useState([]);
  const [plataformas, setPlataformas] = useState([]);
  const [anos, setAnos] = useState([]);
  const [filtroGenero, setFiltroGenero] = useState("");
  const [filtroPlataforma, setFiltroPlataforma] = useState("");
  const [filtroAno, setFiltroAno] = useState("");
  const [ordenarPor, setOrdenarPor] = useState("");
  const [isFiltroAtivo, setIsFiltroAtivo] = useState(false);
  const [ordenarSelecionado, setOrdenarSelecionado] = useState("");
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




  if (!userId) {
    navigate("/home");
    return null;
  }

  useEffect(() => {
    const fetchGames = async () => {
      try {
        const res = await fetch("http://localhost:3000/gametracker/all", { credentials: "include" });
        const data = await res.json();
        setIsFiltroAtivo(false)
        setGames(data);

        setGeneros([...new Set(data.flatMap(g => g.generos ? g.generos.split(",") : []))]);
        setPlataformas([...new Set(data.flatMap(g => g.plataformas ? g.plataformas.split(",") : []))]);
        setAnos([...new Set(data.map(g => new Date(g.data_lancamento).getFullYear()))].sort((a,b) => b-a));
      } catch (err) {
        console.error(err);
      }
    };

    fetchGames();
  }, []);

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






const ordemAlfabetica = (gamesList = []) =>
  [...gamesList].sort((a, b) => a.titulo.localeCompare(b.titulo));

const gamesSeguros = Array.isArray(games) ? games : [];

let gamesFiltrados = gamesSeguros.filter((game) =>
  game.titulo.toLowerCase().includes(nome.toLowerCase())
);

if (!isFiltroAtivo && games.length > 0) {
  gamesFiltrados = ordemAlfabetica(gamesFiltrados);
}





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
        novaLista: false 
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      alert(data.mensagem); 
      return;
    }

    await carregarListas();
    alert(`Jogo adicionado à lista "${descricaoLista}" com sucesso!`);
    setIsPopupOpen(false);
  } catch (err) {
    console.error(err);
    alert("Erro ao adicionar o jogo à lista.");
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
        novaLista: true 
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      alert(data.mensagem); 
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




  const filtrarJogos = async (e) => {
    e.preventDefault();
    setIsFiltroAtivo(true);
    setOrdenarSelecionado(ordenarPor);
    try {
      const query = new URLSearchParams();
  
      if (nome) query.append("nome", nome); 
      if (filtroGenero) query.append("genero", filtroGenero);
      if (filtroPlataforma) query.append("plataforma", filtroPlataforma);
      if (filtroAno) query.append("ano", filtroAno);
      if (ordenarPor) query.append("ordenar", ordenarPor);
  
      const res = await fetch(
        `http://localhost:3000/gametracker/filter?${query.toString()}`,
        { credentials: "include" }
      );
      const data = await res.json();
      setGames(data);
    } catch (err) {
      console.error("Erro ao filtrar jogos:", err);
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

  
  

  

  

 
  

  return (
    <div className="container" style={{
    backgroundImage: `url(/imagens_perfil_fundo/${fundoUsuario})`}}>
      <header className="cabecalho" >
        <div className="BGLogo2">
        <h1 className="logoMain">GameTracker</h1>
        </div>
        <nav>
          <ul>
          
            <li onClick={() => navigate("/mylists", { state: { userId } })}>
              <span><CiBoxList /></span> Minhas Listas
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

      <div className="containerGames">
        <form onSubmit={filtrarJogos}>
          <div className="searchBar">
            
            <input
              type="text"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              placeholder="Buscar jogos..."
            />
            <MdOutlineSearch className="searchIcon" />
            

          </div>
          <div className="filtros">
    <select
  value={filtroGenero}
  onChange={(e) => setFiltroGenero(e.target.value)}
>
  <option value="">Todos os gêneros</option>
  {generos.map((g) => (
    <option key={g} value={g}>
      {g}
    </option>
  ))}
</select>



<select
  value={filtroPlataforma}
  onChange={(e) => setFiltroPlataforma(e.target.value)}
>
  <option value="">Todas as plataformas</option>
  {plataformas.map((p) => (
    <option key={p} value={p}>
      {p}
    </option>
  ))}
</select>


 <select
  value={filtroAno}
  onChange={(e) => setFiltroAno(e.target.value)}
>
  <option value="">Todos os anos</option>
  {anos.map((a) => (
    <option key={a} value={a}>
      {a}
    </option>
  ))}
</select>

  <select
    value={ordenarPor}
    onChange={(e) => setOrdenarPor(e.target.value)}
  >

    <option value="">A-Z</option>
    <option value="rating">Mais bem avaliados</option>
    <option value="ano">Ano</option>
  </select>

  <button type="submit"> <span><FaFilter /></span>
Filtrar</button>
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
                className="botaoaddlista"
                  key={lista.id}
                  onClick={() => adicionarEmLista(lista.descricao)}
                >
                  <span><MdFormatListBulletedAdd /></span>
{lista.descricao}
                </button>
              ))
            ) : (
              <p>Você ainda não tem listas.</p>
            )}

            <h3>Criar nova lista:</h3>
            <input
            className="inputList"
              type="text"
              value={novaLista}
             onChange={(e) => setNovaLista(capitalizeWords(e.target.value))}

              placeholder="Nova Lista:"
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
          {gamesFiltrados.map((game) => {
  const rating = Number(game.media_rating) || 0;
  const ano = new Date(game.data_lancamento).getFullYear();

  return (
    <div
      className="games"
      key={game.id}
      style={{ backgroundImage: `url(/imagens/${game.capa})` }}
      onClick={() => {
        sessionStorage.setItem("scrollPosition", window.scrollY);
        navigate(`/gamepage/${game.id}`, { state: { userId } });
      }}
    >
      <div className="game-title">
        <span className="nomegame">{game.titulo}</span>

       {isFiltroAtivo && ordenarSelecionado === "rating" && (
  <span className="game-info"><p>★</p> {rating.toFixed(1)}</span>
)}

{isFiltroAtivo && ordenarSelecionado === "ano" && (
  <span className="game-info">{ano}</span>
)}

        <MdAddToPhotos
          className="addicon"
          onClick={(e) => {
            e.stopPropagation();
            abrirPopup(game);
          }}
        />
      </div>
    </div>
  );
})}

        </div>
      </div>
    </div>
  );
};
