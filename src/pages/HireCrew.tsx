import { useEffect, useState, useContext } from "react";
import CharacterCards from "../components/CharacterCard";
import { ShipContext } from "../context/ShipContext"
import "../styles/HireCrew.css"
import type { ICharacter, ICharacterResponse } from "../types";
import { useShip } from "../hooks/useShip";
import { getCharacters, getNextPageCharacters, getPrevPageCharacters } from "../services/rickAndMortyService";

export default function HireCrew() {

  const [crews, setCrews] = useState<ICharacter[]>([]); //Estado para almacenar los posts
  const [searchCrew, setSearchCrew] = useState(""); //Estado para las busquedas
  const { credits, crew, addCrewMember, spendCredits } = useShip();
  const [nextUrl, setNextUrl] = useState<string | null>(null); //Estado para guardar la URL de la siguiente página
  const [prevUrl, setPrevUrl] = useState<string | null>(null); //Estado para guardar la URL de la anterior página
  useEffect(() => {
    getCharacters()
      .then((data) => {
        setCrews(data.results);
        setNextUrl(data.info.next);
        setPrevUrl(data.info.prev);
      })
      .catch(error => {
        console.error("Error al cargar los personajes:", error);
      });
  }, []); //[] asegura que solo se ejecute una vez(al montar el componente)


  const filteredCrews = crews.filter((crews)=>
  crews.name.toLowerCase().includes(searchCrew.toLocaleLowerCase())
  );

  function addCrew(candidate: ICharacter) {

    if (crew.length < 4 && credits >= 200) {
      if (!addCrewMember(candidate)) {
        return;
      }
      spendCredits(200);
    }


  }
    return (
        <>
          <h2>HireCrew</h2>
          <input 
          className="searchInput"
          type="text"  
          placeholder="Buscar tripulante..."
          value={searchCrew}
          onChange={(e)=>setSearchCrew(e.target.value)}
          />
          <div className="crew-grid">
          {filteredCrews.map((candidate)=>(
            <CharacterCards key={candidate.id} crew={candidate} onHire={addCrew}/>
          ))}
         
        </div>
      </>
    );

}