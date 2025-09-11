import "./PageGame.css";
import logoPixel from "../assets/logo_pixel.png";
import gameIcon from "../assets/game.jpg";
 
export const PageGame = () => {
  return (
    <div className="PageGame-container">
      <header className="PageGame-header">
        <img src={logoPixel} alt="Logo Pixel" width="400px" />
        <nav className="PageGame-nav">
          <a href="#">Perfil</a>
          <input type="text" placeholder="Search..."/>
        </nav>
      </header>
 
      <div className="PageGame-wrapper">
        <main className="PageGame-main">
          <img src={gameIcon} alt="Game Cover" className="PageGame-cover" />
          <div className="PageGame-info">
            <h1>Hollow Knight: Silksong</h1>
            <p>
              Released on <strong>Sep 04, 2025</strong> by{" "}
              <strong>Team Cherry</strong>
            </p>
            <p>
              Hollow Knight: Silksong is the epic sequel to Hollow Knight, the
              epic action-adventure of bugs and heroes. As the lethal hunter
              Hornet, journey to all-new lands, discover new powers, battle
              vast hordes of bugs and beasts and uncover ancient secrets tied
              to your nature and your past.
            </p>
          </div>
 
          <div className="PageGame-platforms">
            <h3>Platforms</h3>
            <p>
              Linux · Windows PC · Mac · PlayStation 4 · Xbox One · Nintendo
              Switch · PlayStation 5 · Xbox Series · Nintendo Switch 2
            </p>
          </div>
 
          <div className="PageGame-genres">
            <h3>Genres</h3>
            <p>Adventure · Indie · Platform</p>
          </div>
        </main>
      </div>
    </div>
  );
};