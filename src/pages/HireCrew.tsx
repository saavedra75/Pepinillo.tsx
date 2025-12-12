import CharacterCards from "../components/CharacterCard";


export default function HireCrew(){
  
    return (
        <>
          <h2>HireCrew</h2>
          <form action="input">
          <input type="text"  placeholder="Buscar por nombre..."/>
          <button>Buscar</button>
           </form>
          <div className="crew-grid">
          <CharacterCards/>
         
        </div>
      </>
    );

}