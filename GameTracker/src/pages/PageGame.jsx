import "./PageGame.css";
import logoPixel from "../assets/logo_pixel.png";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

export const PageGame = () => {
  const { id } = useParams();
  const [game, setGame] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:3000/gametracker/${id}`, { credentials: "include" })
      .then(res => res.json())
      .then(data => setGame(data))
      .catch(err => console.error(err));
  }, [id]);

  if (!game) return <p>Carregando...</p>;


  return (
    <div className="PageGame-container">
      <header className="PageGame-header">
        <img src={logoPixel} alt="Logo Pixel" width="400px" />
        <nav className="PageGame-nav">
          
        </nav>
      </header>
 
      <div className="PageGame-wrapper">
        <main className="PageGame-main">
        <div style={{ backgroundImage: `url(/imagens_fundo/${game.capa_fundo})` }} className="teste"></div>
        <img src={`/imagens/${game.capa}`} alt="Game Cover" className="PageGame-cover" />
          <div className="PageGame-info">
            <h1>{game.titulo}</h1>
            <p>
  Data de Lançamento: {" "}
  <strong>
    {new Date(game.data_lancamento).toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "short",
      year: "numeric"
    })}
  </strong>{" "} <br />Desenvolvido por : <strong>{game.desenvolvedora}</strong>
</p>
            <p>
              {game.sinopse}
            </p>
          </div>
 
          <div className="PageGame-platforms">
            <h3>Plataformas</h3>
            <p>
              Linux · Windows PC · Mac · PlayStation 4 · Xbox One · Nintendo
              Switch · PlayStation 5 · Xbox Series · Nintendo Switch 2
            </p>
          </div>
 
          <div className="PageGame-genres">
            <h3>Genero</h3>
            <p>Adventure · Indie · Platform</p>
          </div>
        </main>
      </div>
    </div>
  );
};