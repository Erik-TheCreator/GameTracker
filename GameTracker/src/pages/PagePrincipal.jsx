import "./PagePrincipal.css"
import { MdOutlineSearch } from "react-icons/md";

export const PagePrincipal = () => {
  return (
        <div className="container">
            <div className="BGLogo">
                <h1>GameTracker</h1>
            </div>
            <div className="containerGames">
                <form>
                    <div className="searchBar">
                    <input type="text" />
                    <MdOutlineSearch className="searchIcon"/>
                    </div>
                    <select name="" id="">Ano de Lançamento</select>
                    <select name="" id="">Genero</select>


                </form>
                <div className="gamesRow">
                    <div className="games" id="reddead">

                    </div> 
                    <div className="games">

                    </div>
                    <div className="games">

                    </div>
                   
                    

                </div>

            </div>


        </div>
        
  )
}
