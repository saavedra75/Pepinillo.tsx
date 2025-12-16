import { useEffect, useState } from "react";
import CharacterCards from "../components/CharacterCard";
import { useShip } from "../hooks/useShip";
import "../styles/HireCrew.css";
import type { ICharacter } from "../types";
import {
  getCharacters,
  getNextPageCharacters,
  getPrevPageCharacters,
} from "../services/rickAndMortyService";

export default function HireCrew() {
  const [crews, setCrews] = useState<ICharacter[]>([]);
  const [searchCrew, setSearchCrew] = useState("");
  const [hireMessage, setHireMessage] = useState<string | null>(null);
  const [nextUrl, setNextUrl] = useState<string | null>(null);
  const [prevUrl, setPrevUrl] = useState<string | null>(null);

  const { credits, crew, addCrewMember, spendCredits } = useShip();

  useEffect(() => {
    getCharacters()
      .then((data) => {
        setCrews(data.results);
        setNextUrl(data.info.next);
        setPrevUrl(data.info.prev);
      })
      .catch((error) => {
        console.error("Error loading characters:", error);
      });
  }, []);

  const filteredCrews = crews.filter((candidate) =>
    candidate.name.toLowerCase().includes(searchCrew.toLowerCase())
  );

  function addCrew(candidate: ICharacter) {
    if (crew.length < 4 && credits >= 200) {
      if (!crew.some((member) => member.id === candidate.id)) {
        addCrewMember(candidate);
        spendCredits(200);
        setHireMessage(`${candidate.name} has been hired to your crew.`);
         setTimeout(() => {
        setHireMessage(null);
      }, 3000);

      }
    }
  }

  function handlePrev() {
    if (!prevUrl) return;
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

  function handleNext() {
    if (!nextUrl) return;
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

  return (
    <>
  <h1 className="section-title">HIRECREW</h1>
  <div className="Space-Tavern">
  <div className="shipCrew panel">
  <h2 className="crewListTitle">CREW LIST</h2>

  {crew.length === 0 ? (
    <p className="empty">There is no crew assigned. Go to 'Hire Crew' to hire.</p>
  ) : (
    <div className="crewFormation">
      {crew.map((member, index) => (
        <div key={index} className="crewSlot">
          <img src={member.image} alt={member.name} />
          <p>{member.name}</p>
        </div>
      ))}
    </div>
  )}

  {hireMessage && <div className="alert info-alert">{hireMessage}</div>}
</div>

        <div className="crew-grid">
          <input
            className="searchInput"
            type="text"
            placeholder="Find crew member…"
            value={searchCrew}
            onChange={(e) => setSearchCrew(e.target.value)}
          />

          <div className="grid-content">
            {filteredCrews.map((candidate) => (
              <CharacterCards
                key={candidate.id}
                crew={candidate}
                onHire={addCrew}
                isFullTeam={crew.length >= 4}
              />
            ))}
          </div>

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