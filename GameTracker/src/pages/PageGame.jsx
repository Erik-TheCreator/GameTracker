import "./PageGame.css";
import { useParams,useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState} from "react";
import StarRating from "../assets/components/StarRating";
import { CiBoxList } from "react-icons/ci";
import { LuLogOut } from "react-icons/lu";
import { MdKeyboardReturn } from "react-icons/md";
import { FaUserCircle } from "react-icons/fa";
import { TiDelete } from "react-icons/ti";
import { CiEdit } from "react-icons/ci";
import { FaUserAlt } from "react-icons/fa";

export const PageGame = () => {
  const { id } = useParams();
  const [game, setGame] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [novaReview, setNovaReview] = useState("");
  const [rating, setRating] = useState(0);
  const [editReview, setEditReview] = useState(null);
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
        setGame(data)})
      .catch(err => console.error(err));
  }, [id]);

 useEffect(() => {
  fetch(`http://localhost:3000/reviews/${id}`, { credentials: "include" })
    .then(res => res.json())
    .then(data => {
      const ordenadas = data.sort(
        (a, b) => new Date(b.data_review) - new Date(a.data_review)
      );
      setReviews(ordenadas);
    })
    .catch(err => console.error(err));
}, [id]);



const abrirEdicao = (review) => {
  setEditReview(review);
};


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
      const errorData = await res.json();  
      alert(errorData.error || "Erro ao enviar review!");
      setNovaReview("");
      setRating(0)
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

const excluirReview = async (reviewId) => {
  if (!window.confirm("Tem certeza que deseja excluir sua review?")) return;

  try {
    const res = await fetch(`http://localhost:3000/reviews/${reviewId}`, {
      method: "DELETE",
      credentials: "include",
    });

    if (!res.ok) {
      alert("Erro ao excluir review");
      return;
    }

    const atualizadas = await fetch(`http://localhost:3000/reviews/${id}`, { credentials: "include" })
      .then(r => r.json());
    setReviews(atualizadas);
  } catch (err) {
    console.error(err);
    alert("Erro ao excluir review");
  }
};


const salvarEdicao = async () => {
  const res = await fetch(`http://localhost:3000/reviews/${editReview.id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify({
      comentarios: editReview.comentarios,
      rating: editReview.rating
    }),
  });

  if (res.ok) {
    const atualizadas = await fetch(`http://localhost:3000/reviews/${id}`, { credentials: "include" }).then(r => r.json());
    setReviews(atualizadas);
    setEditReview(null);
  } else {
    alert("Erro ao salvar review");
  }
};

const calcularMedia = (reviews) => {
  if (!reviews.length) return 0;
  const soma = reviews.reduce((acc, r) => acc + Number(r.rating || 0), 0);
  return (soma / reviews.length).toFixed(1);
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
            <li onClick={() => navigate("/profile", { state: { userId } })}> <span><FaUserAlt />
            </span> Perfil</li>
            
            <li onClick={() => navigate("/", { state: { userId } })}>
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
        <div className="media-nota">
  {reviews.length === 0 ? (
    <p className="semAvaliacoes"></p>
  ) : (
    <p className="mediaRating">
      <span>★</span> {calcularMedia(reviews)}
    </p>
  )}
</div>

    
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
            <h3>Gêneros</h3>
            <p>{game.generos?.split(",").join(" · ")}</p>
          </div></div>
          <div className="reviews">
          {!editReview && (
            <div className="writeReviewArea">
      <p>Escreva sua análise sobre {game.titulo}</p>            


              <textarea className="writeReview" name="" id="" resize:none value={novaReview} onChange={(e) => setNovaReview(e.target.value)} ></textarea>
              <StarRating rating={rating} setRating={setRating}/>

              <button onClick={enviarReview}>Publicar Análise</button>
            </div> 
            )}
            <h3>Reviews</h3>

            <hr/>

                  <div className="review-list">
          {reviews.length > 0 ? (
            reviews.map((r) => (
              
              <div key={r.id} className="review-item">


            <div className="containerPerfil">
              <div>
                <img src={`/imagens_perfil/${r.foto}`} alt="Foto de perfil" className='imagensperfil' />
                </div>
                <div>
                <p className="autorData"><strong>{r.autor}</strong></p><p className="data">{new Date(r.data_review).toLocaleString("pt-BR", {
        day: "2-digit",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      })}</p></div><p className="estrelas">{"★".repeat(Math.floor(r.rating))}{r.rating % 1 ? "½" : ""}</p>   {r.id_usuario == userId && (
        <div className="botoesReview">

          <span><CiEdit onClick={() => abrirEdicao(r)} className="editReviewIcon"/></span>
          <span><TiDelete onClick={() => excluirReview(r.id)}className="deleteReviewIcon"/></span>
          
        </div>)}</div>
   
                <p className="review">{r.comentarios}</p>

             

              </div>
            ))
          ) : (
            <p className="primeirareview">Seja o primeiro a escrever uma review!</p>
          )}
        </div>


        {editReview && (
  <div className="popupFloating2">
    <textarea
      value={editReview.comentarios}
      onChange={(e) => setEditReview({...editReview, comentarios: e.target.value})}
    />
    <StarRating
      rating={editReview.rating}
      setRating={(r) => setEditReview({...editReview, rating: r})}
    />
    <button onClick={salvarEdicao}>Salvar</button>
    <button onClick={() => setEditReview(null)}>Cancelar</button>
  </div>
)}




        
          </div>
        </main>
      </div>
    </div>
  );
};