import type { ICharacter } from "../types";
import "../styles/CharacterCard.css"

interface Props{
  crew: ICharacter;
  onHire: (ICharacter: ICharacter)=>void;
}

export default function CharacterCard({crew, onHire}:Props){  
  return(
    <>        
    <div className="crew-card"key={crew.id}>
      <img src={crew.image} alt={crew.name}/>
      <h3>{crew.name}</h3>
      <p>{crew.species}</p>
      <small>{crew.status}</small>
      <div className="card-action">
        <button
        className="btn-action btn-feed" 
        onClick={()=>onHire(crew)}
          disabled={crew.status==="Dead"||crew.status==="unknown"}
          >Hire</button>
        </div>                         
    </div>            
    </>
        )
        }
    