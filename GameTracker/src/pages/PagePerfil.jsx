import "./PagePerfil.css";
import { useState,useEffect } from "react";
import { useNavigate,useLocation } from "react-router-dom";
import { CiBoxList } from "react-icons/ci";
import { LuLogOut } from "react-icons/lu";
import { MdKeyboardReturn } from "react-icons/md";
import { FaEdit } from "react-icons/fa";

export const PagePerfil = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [editprofile,setEditProfile]=useState(true)
    const [novoSobre, setNovoSobre] = useState("");
    const [modoEdicao, setModoEdicao] = useState("foto"); 
    const [novoFoto, setNovoFoto] = useState("");
    const [bordaPerfil, setBordaPerfil] = useState("");
    const [fotoFundo, setfotoFundo] = useState("img.webp");
    




    const [user, setUser] = useState({
      nome: "",
      foto: "default.webp",
      sobre:"",
      bordaPerfil: "",   
      fotoFundo: "img.web"
    });
    const userId = location.state?.userId || sessionStorage.getItem("userId");

    const [novoNome,setNovoNome]=useState("")

    const trocarFoto = async (novaFoto) => {
  
  setNovoFoto(novaFoto);

      };
      

    useEffect(() => {
  const carregarUser = async () => {
    const res = await fetch("http://localhost:3000/usuarios/me", {
      credentials: "include",
    });
    if (res.ok) {
      const data = await res.json();
      setUser({
        nome: data.nome,
        foto: data.foto || "default.webp",
        sobre: data.sobre || "",
        bordaPerfil: data.bordaPerfil || "",
        fotoFundo: data.fotoFundo || "img.webp"   
      });
      setNovoNome(data.nome);
      setNovoSobre(data.sobre || "");
      setBordaPerfil(data.bordaPerfil || "");
      setfotoFundo(data.fotoFundo || "img.webp");
    }
  };

  carregarUser();
}, []);

const salvarPerfil = async () => {
  try {
    const res = await fetch("http://localhost:3000/usuarios", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ 
        nome: novoNome || user.nome, 
        sobre: novoSobre, 
        foto: novoFoto || user.foto,
        bordaPerfil: bordaPerfil,
        fotoFundo: fotoFundo || user.fotoFundo
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      alert(data.mensagem || "Erro ao atualizar perfil."); 
      return;
    }

    alert("Perfil atualizado com sucesso!"); 
    setUser((prev) => ({ 
      ...prev, 
      nome: novoNome || prev.nome, 
      sobre: novoSobre,
      foto: novoFoto || prev.foto,
      bordaPerfil: bordaPerfil || prev.bordaPerfil,
      fotoFundo: fotoFundo || prev.fotoFundo
    }));
    setEditProfile(true); 
  } catch (err) {
    console.error(err);
    alert("Erro no servidor."); 
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

  if (!userId) {
    navigate("/home");
    return null;
  }





    

 
    return (
      <div 
      className="container-perfil"
      style={{
        backgroundImage: `url(/imagens_perfil_fundo/${modoEdicao === "bg" ? fotoFundo : user.fotoFundo})`
      }}
    >
    
            <header className="cabecalho">
              <div className="BGLogo2">
        <h1 className="logoMain">GameTracker</h1>
        </div>
        <nav>
          <ul>
          <li onClick={() => navigate("/home", { state: { userId } })}>
          <span><MdKeyboardReturn /></span> Voltar </li>
            <li onClick={() => navigate("/mylists", { state: { userId } })}>
              <span><CiBoxList /></span> Minhas Listas
            </li>
       
           <li onClick={handleLogout}>
  <span><LuLogOut /></span> Sair
</li>
          </ul>
        </nav>
      </header>
 
 
            <div className="BGLogo3">
                <h1>Meu Perfil</h1>
            </div>
 
            <div className="perfil-box" style={{ width: editprofile ? "" : "" ,
            height: editprofile ? "" : "" 
            }} >


                {editprofile ? (

                <div className="perfil-barra-esquerda">
                  
                <img src={`/imagens_perfil/${user.foto}`} alt="Foto de perfil" className='fotoperfil' style={{ border: bordaPerfil ? `3px solid ${user.bordaPerfil}` : "none" }}/>
                
                    <h2 className="perfil-nome">{user.nome}</h2>
                    <div className="perfil-section">
                      
                        <h3>Sobre mim</h3>
                        
                        <p>{user.sobre || "Ainda não escreveu nada sobre você."}</p>
                    </div>
                    <button  onClick={(e)=> setEditProfile(false) }><FaEdit className="editprofileicon"/>
Editar</button>
                </div>

) : (

    <div className="editProfileContainer">

       <img 
  src={`/imagens_perfil/${novoFoto || user.foto}`} 
  alt="Foto de perfil" 
  className='fotoperfil'
  style={{ border: bordaPerfil ? `3px solid ${bordaPerfil}` : "none" }}
/>
 <h3>Cor da borda</h3>
 <input 
    type="color" 
    value={bordaPerfil || ""} 
    onChange={(e) => setBordaPerfil(e.target.value)} className="inputborda"
  />
  <button onClick={() => setBordaPerfil("")} className="buttonborda">Sem borda</button>


        <input type="text" placeholder={user.nome} value={novoNome}  onChange={(e) => setNovoNome(e.target.value)}/>
        <div className="perfil-section">
          
          
                        <h3>Sobre mim</h3>
                        <textarea 
      value={novoSobre} 
      onChange={(e) => setNovoSobre(e.target.value)} 
      placeholder="Escreva sobre você..."
    />
    <div className="botoespersonalizarcontainer">
     <button onClick={() => setModoEdicao("foto")}className="botoespersonalizar">Foto de Perfil</button>

  <button onClick={() => setModoEdicao("bg")}
    className="botoespersonalizar">Plano de fundo</button>

    </div>
    



      
                    </div>

     {modoEdicao === "foto" ? (
  <>
  <div className="imagescontainer">
     <div className="imagesRow">
        <img src="imagens_perfil/arthur.jpg" alt="" className="fotos" onClick={() => trocarFoto("arthur.jpg")}/>
        <img src="imagens_perfil/ryu.jpg" alt="" className="fotos" onClick={() => trocarFoto("ryu.jpg")}/>
        <img src="imagens_perfil/joel.jpg" alt="" className="fotos" onClick={() => trocarFoto("joel.jpg")}/>
        <img src="imagens_perfil/leon.jpg" alt="" className="fotos" onClick={() => trocarFoto("leon.jpg")}/>
        <img src="imagens_perfil/spiderman.png" alt="" className="fotos" onClick={() => trocarFoto("spiderman.png")}/>
        </div>
        <div className="imagesRow2">
        <img src="imagens_perfil/sadie.avif" alt="" className="fotos" onClick={() => trocarFoto("sadie.avif")}/>
        <img src="imagens_perfil/chunli.jpg" alt="" className="fotos" onClick={() => trocarFoto("chunli.jpg")}/>
        <img src="imagens_perfil/ellie.jpg" alt="" className="fotos" onClick={() => trocarFoto("ellie.jpg")}/>
        <img src="imagens_perfil/jill.png" alt="" className="fotos" onClick={() => trocarFoto("jill.png")}/>
        <img src="imagens_perfil/mj.jpg" alt="" className="fotos" onClick={() => trocarFoto("mj.jpg")}/>            
        </div>
        <div className="imagesRow2">
        <img src="imagens_perfil/dante.jpg" alt="" className="fotos" onClick={() => trocarFoto("dante.jpg")}/>
        <img src="imagens_perfil/batman.webp" alt="" className="fotos" onClick={() => trocarFoto("batman.webp")}/>
        <img src="imagens_perfil/corvo.jpg" alt="" className="fotos" onClick={() => trocarFoto("corvo.jpg")}/>
        <img src="imagens_perfil/cloud.png" alt="" className="fotos" onClick={() => trocarFoto("cloud.png")}/>
        <img src="imagens_perfil/price.jpg" alt="" className="fotos" onClick={() => trocarFoto("price.jpg")}/>
        </div>
        <div className="imagesRow2">
        <img src="imagens_perfil/lady.jpg" alt="" className="fotos" onClick={() => trocarFoto("lady.jpg")}/>
        <img src="imagens_perfil/cat.avif" alt="" className="fotos" onClick={() => trocarFoto("cat.avif")}/>
        <img src="imagens_perfil/emily.jpg" alt="" className="fotos" onClick={() => trocarFoto("emily.jpg")}/>
        <img src="imagens_perfil/tifa.jpg" alt="" className="fotos" onClick={() => trocarFoto("tifa.jpg")}/>
        <img src="imagens_perfil/valeria.jpg" alt="" className="fotos" onClick={() => trocarFoto("valeria.jpg")}/>
        </div>
        </div>
  </>
) : modoEdicao === "bg" ? (
 <>
 <div className="imagescontainer">
  <div className="imagesRow">
        <img src="imagens_perfil_fundo/batman.jpg" alt="" className="fotosbg" onClick={() => setfotoFundo("batman.jpg")}/>
        <img src="imagens_perfil_fundo/cod.jpg" alt="" className="fotosbg" onClick={() => setfotoFundo("cod.jpg")}/>
        <img src="imagens_perfil_fundo/dishonored.jfif" alt="" className="fotosbg" onClick={() => setfotoFundo("dishonored.jfif")}/>
        <img src="imagens_perfil_fundo/dmc3.jpg" alt="" className="fotosbg" onClick={() => setfotoFundo("dmc3.jpg")}/>
        <img src="imagens_perfil_fundo/finalfantasy.jfif" alt="" className="fotosbg" onClick={() => setfotoFundo("finalfantasy.jfif")}/>
      
        </div>
        <div className="imagesRow2">
        <img src="imagens_perfil_fundo/reddead2.png" alt="" className="fotosbg" onClick={() => setfotoFundo("reddead2.png")}/>
        <img src="imagens_perfil_fundo/resident.jpg" alt="" className="fotosbg" onClick={() => setfotoFundo("resident.jpg")}/>
        <img src="imagens_perfil_fundo/spiderman.jpg" alt="" className="fotosbg" onClick={() => setfotoFundo("spiderman.jpg")}/>
        <img src="imagens_perfil_fundo/streetfighter6.jpg" alt="" className="fotosbg" onClick={() => setfotoFundo("streetfighter6.jpg")}/>
        <img src="imagens_perfil_fundo/thelast.jpg" alt="" className="fotosbg" onClick={() => setfotoFundo("thelast.jpg")}/>
      
        </div>
        <div className="imagesRow2">
  <img src="imagens_perfil_fundo/ac.jpg" alt="" className="fotosbg" onClick={() => setfotoFundo("ac.jpg")} />
  <img src="imagens_perfil_fundo/ac1.jpg" alt="" className="fotosbg" onClick={() => setfotoFundo("ac1.jpg")} />
  <img src="imagens_perfil_fundo/blackops2.jpg" alt="" className="fotosbg" onClick={() => setfotoFundo("blackops2.jpg")} />
  <img src="imagens_perfil_fundo/chris.png" alt="" className="fotosbg" onClick={() => setfotoFundo("chris.png")} />
  <img src="imagens_perfil_fundo/gtasa.png" alt="" className="fotosbg" onClick={() => setfotoFundo("gtasa.png")} />
  
</div>
<div className="imagesRow2">
  
  <img src="imagens_perfil_fundo/hollow.jpg" alt="" className="fotosbg" onClick={() => setfotoFundo("hollow.jpg")} />
  <img src="imagens_perfil_fundo/kof96.jpg" alt="" className="fotosbg" onClick={() => setfotoFundo("kof96.jpg")} />
  <img src="imagens_perfil_fundo/kratos.jpg" alt="" className="fotosbg" onClick={() => setfotoFundo("kratos.jpg")} />
  <img src="imagens_perfil_fundo/minecraft.png" alt="" className="fotosbg" onClick={() => setfotoFundo("minecraft.png")} />
  <img src="imagens_perfil_fundo/sonic.jpg" alt="" className="fotosbg" onClick={() => setfotoFundo("sonic.jpg")} />
</div>

<div className="imagesRow2">
  <img src="imagens_perfil_fundo/dark.jpg" alt="" className="fotosbg" onClick={() => setfotoFundo("dark.jpg")} />
  <img src="imagens_perfil_fundo/death.jpg" alt="" className="fotosbg" onClick={() => setfotoFundo("death.jpg")} />
  <img src="imagens_perfil_fundo/outer.jpg" alt="" className="fotosbg" onClick={() => setfotoFundo("outer.jpg")} />
  <img src="imagens_perfil_fundo/re4.png" alt="" className="fotosbg" onClick={() => setfotoFundo("re4.png")} />
  <img src="imagens_perfil_fundo/red1.jpg" alt="" className="fotosbg" onClick={() => setfotoFundo("red1.jpg")} />
</div>

<div className="imagesRow2">
  <img src="imagens_perfil_fundo/halo.jpg" alt="" className="fotosbg" onClick={() => setfotoFundo("halo.jpg")} />
  <img src="imagens_perfil_fundo/skyrim.jfif" alt="" className="fotosbg" onClick={() => setfotoFundo("skyrim.jfif")} />
</div>


        </div>
 </>
) : null}


                    

      
   <button onClick={salvarPerfil}>Salvar Mudanças</button>
   <p onClick={(e)=>{

    setBordaPerfil(user.bordaPerfil)
    setNovoFoto(user.foto)
    setfotoFundo(user.fotoFundo)
    setEditProfile(true)
   }}>Voltar</p>

    </div>
)}
 
             
            </div>
        </div>
    );
};