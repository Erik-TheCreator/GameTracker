import "./PageGame.css";
import logoPixel from "../assets/logo_pixel.png";
import { useParams,useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState} from "react";
import StarRating from "../assets/components/StarRating";
import { CiBoxList } from "react-icons/ci";
import { LuLogOut } from "react-icons/lu";
import { MdKeyboardReturn } from "react-icons/md";

export const PageGame = () => {
  const { id } = useParams();
  const [game, setGame] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [novaReview, setNovaReview] = useState("");
  const [rating, setRating] = useState(0);
  const navigate=useNavigate();
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

  useEffect(() => {
  fetch(`http://localhost:3000/reviews/${id}`, { credentials: "include" })
    .then(res => res.json())
    .then(data => {
      console.log("Reviews recebidas:", data);
      setReviews(data)})
    .catch(err => console.error(err));
}, [id]);

const enviarReview = async () => {
  if (!novaReview.trim()) return alert("Digite sua review!");

  try {
    const res = await fetch("http://localhost:3000/reviews", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({
        id_usuario: userId,
        id_game: id,
        review: novaReview,
        rating:rating
      }),
    });

    if (!res.ok) {
      const errorText = await res.text(); 
      alert("Erro ao enviar review!");
      return;
    }

    const atualizadas = await fetch(`http://localhost:3000/reviews/${id}`, { credentials: "include" })
      .then(r => r.json());
    setReviews(atualizadas);
    setNovaReview("");
    setRating(0)
  } catch (err) {
    console.error(err);
    alert("Erro ao enviar review!");
  }
};


  if (!userId) {
    return <p>Redirecionando...</p>; 
  }
  if (!game) return <p>Carregando...</p>;



  return (
    <div className="PageGame-container">
      <header className="PageGame-header">
      <div className="BGLogo2">
        <h1 onClick={(e)=> navigate("/home", { state: { userId } })}>GameTracker</h1>
      </div>
      <nav>
          <ul>
          <li onClick={() => navigate("/home", { state: { userId } })}>
          <span><MdKeyboardReturn /></span> Voltar </li>
            <li onClick={() => navigate("/mylists", { state: { userId } })}>
              
              <span><CiBoxList /></span> Minhas Listas
            </li>
            
            <li>
              <span><LuLogOut /></span> Logout
            </li>
          </ul>
        </nav>
      </header>
 
      <div className="PageGame-wrapper">
        <div className="fundodogamebgImage">
        <div style={{ backgroundImage: `url(/imagens_fundo/${game.capa_fundo})` }} className="gamebgImage">
         <img src={`/imagens/${game.capa}`} alt="Game Cover" className="PageGame-cover" />
        </div>
        </div>
        <main className="PageGame-main">
    
          <div className="PageGame-info">
            <h1 className="gameTitulo">{game.titulo}</h1>
            <p className="gameData">
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


          <div className="generoPlataforma">
 
          <div className="PageGame-platforms">
            <h3 >Plataformas</h3>
            <p>
            {game.plataformas?.split(",").join(" · ")}
            </p>
          </div>
 
          <div className="PageGame-genres">
            <h3>Genero</h3>
            <p>{game.generos?.split(",").join(" · ")}</p>
          </div></div>
          <div className="reviews">
            <div className="writeReviewArea">
            <p>Escreva sua análise sobre {game.titulo}</p>

              <textarea className="writeReview" name="" id="" resize:none value={novaReview} onChange={(e) => setNovaReview(e.target.value)}></textarea>
              <StarRating rating={rating} setRating={setRating} />
              <button onClick={enviarReview}>Publicar Análise</button>
            </div>
            <h3>Reviews</h3>
            <hr/>

                  <div className="review-list">
          {reviews.length > 0 ? (
            reviews.map((r) => (
              <div key={r.id} className="review-item">
                <div>
                <p className="autorData"><strong>{r.autor}</strong></p><p className="data">{new Date(r.data_review).toLocaleString("pt-BR", {
        day: "2-digit",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      })}</p></div><p className="estrelas">{"⭐".repeat(Math.floor(r.rating))}{r.rating % 1 ? "½" : ""}</p>
                <p className="review">{r.comentarios}</p>

              </div>
            ))
          ) : (
            <p className="primeirareview">Seja o primeiro a escrever uma review!</p>
          )}
        </div>


        
          </div>
        </main>
      </div>
    </div>
  );
};