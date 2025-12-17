// Importación de hooks y dependencias necesarias
import { useEffect, useState } from "react";
import CharacterCards from "../components/CharacterCard"; // Componente para renderizar cada personaje
import { useShip } from "../hooks/useShip"; // Hook personalizado que gestiona estado de la nave y tripulación
import "../styles/HireCrew.css"; // Estilos específicos para esta vista
import type { ICharacter } from "../types"; // Tipado de personajes
import {
  getCharacters,          // Servicio para obtener personajes iniciales
  getNextPageCharacters,  // Servicio para obtener la siguiente página de personajes
  getPrevPageCharacters,  // Servicio para obtener la página anterior de personajes
} from "../services/rickAndMortyService";

// Componente principal para contratar tripulación
export default function HireCrew() {
  // Estado local para manejar lista de personajes disponibles
  const [crews, setCrews] = useState<ICharacter[]>([]);
  // Estado para búsqueda de personajes por nombre
  const [searchCrew, setSearchCrew] = useState("");
  // Mensaje temporal que aparece al contratar un personaje
  const [hireMessage, setHireMessage] = useState<string | null>(null);
  // URLs para paginación (siguiente y anterior)
  const [nextUrl, setNextUrl] = useState<string | null>(null);
  const [prevUrl, setPrevUrl] = useState<string | null>(null);

  // Hook que expone créditos disponibles, tripulación actual y funciones para modificarla
  const { credits, crew, addCrewMember, spendCredits } = useShip();

  // useEffect inicial: carga la primera página de personajes al montar el componente
  useEffect(() => {
    getCharacters()
      .then((data) => {
        setCrews(data.results);     // Guardamos personajes obtenidos
        setNextUrl(data.info.next); // Guardamos URL de la siguiente página
        setPrevUrl(data.info.prev); // Guardamos URL de la página anterior
      })
      .catch((error) => {
        console.error("Error loading characters:", error);
      });
  }, []);

  // Filtrado de personajes según el texto ingresado en el buscador
  const filteredCrews = crews.filter((candidate) =>
    candidate.name.toLowerCase().includes(searchCrew.toLowerCase())
  );

  // Función para contratar un personaje
  function addCrew(candidate: ICharacter) {
    // Validamos que haya espacio (<4 miembros) y créditos suficientes (>=200)
    if (crew.length < 4 && credits >= 200) {
      // Evitamos duplicados comprobando si ya está en la tripulación
      if (!crew.some((member) => member.id === candidate.id)) {
        addCrewMember(candidate); // Añadimos al nuevo miembro
        spendCredits(200);        // Restamos créditos
        setHireMessage(`${candidate.name} has been hired to your crew.`); // Mostramos mensaje de confirmación
        // Ocultamos el mensaje después de 3 segundos
        setTimeout(() => {
          setHireMessage(null);
        }, 3000);
      }
    }
  }

  // Función para cargar la página anterior de personajes
  function handlePrev() {
    if (!prevUrl) return; // Si no hay URL previa, no hacemos nada
    getPrevPageCharacters(prevUrl)
      .then((data) => {
        setCrews(data.results);
        setNextUrl(data.info.next);
        setPrevUrl(data.info.prev);
      })
      .catch((error) => {
        console.error("Error loading characters:", error);
      });
  }

  // Función para cargar la siguiente página de personajes
  function handleNext() {
    if (!nextUrl) return; // Si no hay URL siguiente, no hacemos nada
    getNextPageCharacters(nextUrl)
      .then((data) => {
        setCrews(data.results);
        setNextUrl(data.info.next);
        setPrevUrl(data.info.prev);
      })
      .catch((error) => {
        console.error("Error loading characters:", error);
      });
  }

  // Renderizado del componente
  return (
    <>
      <h1 className="section-title">HIRECREW</h1>
      <div className="Space-Tavern">
        
        {/* Panel que muestra la tripulación actual */}
        <div className="shipCrew panel">
          <h2 className="crewListTitle">CREW LIST</h2>

          {/* Si no hay tripulación, mostramos mensaje vacío */}
          {crew.length === 0 ? (
            <p className="empty">There is no crew assigned. Go to 'Hire Crew' to hire.</p>
          ) : (
            <div className="crewFormation">
              {/* Renderizamos cada miembro actual de la tripulación */}
              {crew.map((member, index) => (
                <div key={index} className="crewSlot">
                  <img src={member.image} alt={member.name} />
                  <p>{member.name}</p>
                </div>
              ))}
            </div>
          )}

          {/* Mensaje temporal al contratar */}
          {hireMessage && <div className="alert info-alert">{hireMessage}</div>}
        </div>

        {/* Panel para contratar nuevos miembros */}
        <div className="crew-grid">
          {/* Input de búsqueda */}
          <input
            className="searchInput"
            type="text"
            placeholder="Find crew member…"
            value={searchCrew}
            onChange={(e) => setSearchCrew(e.target.value)}
          />

          {/* Grid con personajes filtrados */}
          <div className="grid-content">
            {filteredCrews.map((candidate) => (
              <CharacterCards
                key={candidate.id}
                crew={candidate}
                onHire={addCrew} // Acción de contratar
                isFullTeam={crew.length >= 4} // Estado: tripulación llena
                isInCrew={crew.some(member => member.id === candidate.id)} // Estado: ya contratado
                hasCredits={credits >= 200} // Estado: créditos suficientes
              />
            ))}
          </div>

          {/* Botones de paginación */}
          <div className="btn-grid">
            <button className="btn-feed" onClick={handlePrev} disabled={!prevUrl}>
              Prev
            </button>
            <button className="btn-feed" onClick={handleNext} disabled={!nextUrl}>
              Next
            </button>
          </div>
        </div>
      </div>
    </>
  );
}