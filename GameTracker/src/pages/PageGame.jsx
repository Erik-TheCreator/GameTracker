import "./PageGame.css";
import logoPixel from "../assets/logo_pixel.png";
import { useParams,useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState} from "react";

export const PageGame = () => {
  const { id } = useParams();
  const [game, setGame] = useState(null);
  const navigate=useNavigate()
  const location = useLocation();
  const userId = location.state?.userId || sessionStorage.getItem("userId");


  useEffect(() => {
    if (!userId) {
      navigate("/home");
    }
  }, [userId, navigate]);

  useEffect(() => {
    fetch(`http://localhost:3000/gametracker/${id}`, { credentials: "include" })
      .then(res => res.json())
      .then(data => {
        console.log("Dados do jogo:", data);
        setGame(data)})
      .catch(err => console.error(err));
  }, [id]);

  if (!userId) {
    return <p>Redirecionando...</p>; 
  }
  if (!game) return <p>Carregando...</p>;



  return (
    <div className="PageGame-container">
      <header className="PageGame-header">
        <img src={logoPixel} alt="Logo Pixel"  onClick={(e)=> navigate("/home", { state: { userId } })} />
        <nav className="PageGame-nav">
          
        </nav>
      </header>
 
      <div className="PageGame-wrapper">
        
        <main className="PageGame-main">
        <div style={{ backgroundImage: `url(/imagens_fundo/${game.capa_fundo})` }} className="teste">
        </div>
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
            {game.plataformas?.split(",").join(" · ")}
            </p>
          </div>
 
          <div className="PageGame-genres">
            <h3>Genero</h3>
            <p>{game.generos?.split(",").join(" · ")}</p>
          </div>
        </main>
      </div>
    </div>
  );
};