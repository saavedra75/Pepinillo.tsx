import CharacterCards from "../components/CharacterCard";
import "./HireCrew.css"


export default function HireCrew(){
  
    return (
        <>
          <h2>HireCrew</h2>
                    <input type="text"  placeholder="Buscar por nombre..."/>
          <button>Buscar</button>
       
          <div className="crew-grid">
          <CharacterCards/>
         
        </div>
      </>
    );

}