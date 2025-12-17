import type { ICharacter } from "../types";
import "../styles/CharacterCard.css"

interface Props{
  crew: ICharacter;
  onHire: (ICharacter: ICharacter)=>void;
  isFullTeam:boolean;
  isInCrew:boolean;
  hasCredits:boolean;
}

export default function CharacterCard({ crew, onHire, isFullTeam , isInCrew,hasCredits}:Props) {
  return (
    <div className={`crew-card ${crew.status === "Dead" ? "dead-card" : ""}`}>
      <img src={crew.image} alt={crew.name} />
      <h3>{crew.name}</h3>
      <p>{crew.species}</p>
      <p>Status: {crew.status}</p>

      <div className="card-actions">
        <button
          className="btn-feed"
          onClick={() => onHire(crew)}
          disabled={isFullTeam||isInCrew||crew.status==="Dead"||crew.status==="unknown"||!hasCredits}
          
        >          
          {
          isInCrew
            ? "Already in crew"
            : crew.status === "Dead"
            ? "Dead"
            : crew.status === "unknown"
            ? "Unavailable"
            : isFullTeam
            ? "FULL"
            : !hasCredits
            ? "No Credits"
            : "Hire"
        }

        </button>
      </div>
    </div>
  );
}
    