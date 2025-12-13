import { useEffect, useState } from "react";
import CharacterCards from "../components/CharacterCard";
import type { Character } from "../types";
import "./HireCrew.css"

export default function HireCrew(){

const[crews, setCrews]=useState<Character[]>([]); //Estado para almacenar los posts
const [searchCrew, setSearchCrew]=useState(""); //Estado para las busquedas

  useEffect(()=>{
    //Realizo la petición a la API
    fetch("https://rickandmortyapi.com/api/character")
    .then(response=>response.json())
    .then(data=>{
      setCrews(data.results); //Guardo los dados en el estado
    })
    .catch(error=>{
      console.error("Error fetching posts:",error);
    });
  },[]); //[] asegura que solo se ejecute una vez(al montar el componente)


  const filteredCrews = crews.filter((crews)=>
  crews.name.toLowerCase().includes(searchCrew.toLocaleLowerCase())
  );

  function addCrew(id: number){
    //Conexión de Shipcontexts

  }
    return (
        <>
          <h2>HireCrew</h2>
          <input 
          type="text"  
          placeholder="Buscar tripulante..."
          value={searchCrew}
          onChange={(e)=>setSearchCrew(e.target.value)}
          />
          <div className="crew-grid">
          {filteredCrews.map((crew)=>(
            <CharacterCards key={crew.id} crew={crew} onHire={addCrew}/>
          ))}
         
        </div>
      </>
    );

}