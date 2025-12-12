import { useEffect, useState } from "react";
import type { Character } from "../types";
const[crews, setCrews]=useState<Character[]>([]); //Estado para almacenar los posts

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
 {crews.map(crew=>(
              <li key={crew.id}>
                <img src={crew.image} alt={crew.name}/>
                <h3>{crew.name}</h3>
                <p>{crew.species}</p>
                <small>{crew.status}</small>
                 </li>
            ))}