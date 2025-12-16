import {useEffect, useState, useContext } from "react";
import CharacterCards from "../components/CharacterCard";
import {ShipContext} from "../context/ShipContext"
<<<<<<< HEAD
import type { ICharacter } from "../types";
import "../styles/HireCrew.css"
=======
import type { ICharacter, ICharacterResponse } from "../types";
import "./HireCrew.css"
>>>>>>> Manuel
import { useShip } from "../hooks/useShip";
import { getCharacters } from "../services/rickAndMortyService";

export default function HireCrew(){

const[crews, setCrews]=useState<ICharacter[]>([]); //Estado para almacenar los posts
const [searchCrew, setSearchCrew]=useState(""); //Estado para las busquedas
const {credits, crew, addCrewMember, spendCredits} = useShip();

  useEffect(() => {
    getCharacters()
    .then((data) => {
      setCrews(data.results);
    })
    .catch(error => {
      console.error("Error al cargar los personajes:", error);
    });
  }, []); //[] asegura que solo se ejecute una vez(al montar el componente)


  const filteredCrews = crews.filter((crews)=>
  crews.name.toLowerCase().includes(searchCrew.toLocaleLowerCase())
  );

  function addCrew(candidate: ICharacter){
  
   if (crew.length < 4 && credits >= 200) {
    if(!addCrewMember(candidate)){
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