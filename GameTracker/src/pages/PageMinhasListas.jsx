import { useEffect, useState } from "react";
import { useLocation,useNavigate } from "react-router-dom";
import "./PageMinhasListas.css"; 
import { MdOutlineSearch, MdAddToPhotos } from "react-icons/md";
import { CiBoxList } from "react-icons/ci";
import { LuLogOut } from "react-icons/lu";

export const PageMinhasListas = () => {
  const location = useLocation();
  const navigate=useNavigate()
  const userId = location.state?.userId;
  const [listas, setListas] = useState([]);


  useEffect(() => {
    fetch(`http://localhost:3000/listas/com-jogos/${userId}`, { credentials: "include" })
      .then(res => res.json())
      .then(data => setListas(data))
      .catch(err => console.log(err));
  }, [userId]);


  return (
    <div className="container">
    <header className="cabecalho">
        <nav>
          <ul>
            <li onClick={(e)=>navigate("/home",{ state: { userId } })}><span><CiBoxList /></span> Voltar</li>
            <li><span><LuLogOut />
            </span> Logout</li>
          </ul>
        </nav>

      </header>
      <div className="BGLogo">
        <h1>Minhas Listas</h1>
      </div>

      <div className="containerGames">
        {listas.length === 0 ? (
          <p className="listavazia">Você ainda não tem listas.</p>
        ) : (
          listas.map((lista) => (
            <div key={lista.id} >
              <h2 className="nomedalista">{lista.descricao}</h2>
              <div className="gamesRow">
                {lista.games && lista.games.length > 0 ? (
                  lista.games.map((game) => (
                    <div
                      className="games"
                      key={game.id}
                      style={{ backgroundImage: `url(/imagens/${game.capa})` }}>

                      <div className="game-title">
                        <span>{game.titulo}</span>
                      </div>
                    </div>
                  ))
                ) : (
                  <p>Nenhum jogo nesta lista</p>
                )}
              </div>
            </div>
          ))
        )}

      </div>
    </div>
  );
};
