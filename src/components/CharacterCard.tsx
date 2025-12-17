// Importamos el tipo de personaje y los estilos asociados
import type { ICharacter } from "../types";
import "../styles/CharacterCard.css"

// Definimos las props que recibirá el componente CharacterCard
interface Props {
  crew: ICharacter;                          // Personaje a mostrar en la tarjeta
  onHire: (ICharacter: ICharacter) => void;  // Función para contratar al personaje
  isFullTeam: boolean;                       // Indica si la tripulación ya está completa
  isInCrew: boolean;                         // Indica si el personaje ya forma parte de la tripulación
  hasCredits: boolean;                       // Indica si hay créditos suficientes para contratar
}

// Componente que renderiza la tarjeta de un personaje
export default function CharacterCard({ crew, onHire, isFullTeam, isInCrew, hasCredits }: Props) {
  return (
    // Contenedor principal de la tarjeta
    // Se aplican clases condicionales según el estado del personaje (Dead o unknown)
    <div className={`crew-card ${crew.status === "Dead" ? "dead-card" : ""} ${crew.status === "unknown" ? "unknown-card" : ""}`}>
      
      {/* Imagen del personaje */}
      <img src={crew.image} alt={crew.name} />
      
      {/* Nombre y especie */}
      <h3>{crew.name}</h3>
      <p>{crew.species}</p>
      
      {/* Estado del personaje */}
      <p>Status: {crew.status}</p>

      {/* Sección de acciones de la tarjeta */}
      <div className="card-actions">
        <button
          className="btn-feed"
          onClick={() => onHire(crew)} // Al hacer clic, intentamos contratar al personaje
          // El botón se desactiva si:
          // - La tripulación está llena
          // - El personaje ya está en la tripulación
          // - El personaje está muerto
          // - El personaje está en estado "unknown"
          // - No hay créditos suficientes
          disabled={isFullTeam || isInCrew || crew.status === "Dead" || crew.status === "unknown" || !hasCredits}
        >
          {
            // Texto dinámico del botón según las condiciones
            isInCrew
              ? "Already in crew"   // Ya contratado
              : crew.status === "Dead"
              ? "Dead"              // Personaje muerto
              : crew.status === "unknown"
              ? "Unavailable"       // Estado desconocido → no disponible
              : isFullTeam
              ? "FULL"              // Tripulación llena
              : !hasCredits
              ? "No Credits"        // Créditos insuficientes
              : "Hire"              // Disponible para contratar
          }
        </button>
      </div>
    </div>
  );
}