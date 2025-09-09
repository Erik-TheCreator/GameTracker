import "./PagePrincipal.css"
import { MdOutlineSearch,MdAddToPhotos } from "react-icons/md";
import { useState,useEffect } from "react";

export const PagePrincipal = () => {
    const [games,setGames]= useState([]);
    const [nome, setNome]= useState("");

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
  return (
        <div className="container">
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

                <div className="gamesRow">
                     {gamesFiltrados.map((game)=>(
                        <div className="games"  style={{    backgroundImage: `url(/imagens/${game.capa})`,
                          }}>
                            <div className="game-title"><span>{game.titulo}</span><MdAddToPhotos className="addicon"/>
                            </div>
                        </div>

                    ))}

             
             </div>
                   
                    

                </div>

            </div>


   
        
  )
}
