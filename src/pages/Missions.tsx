import { useEffect, useState } from "react";
import { ShipContext } from "../context/ShipContext";
import { useShip } from "../hooks/useShip";
import { getLocations } from "../services/rickAndMortyService";
import type { ILocation } from "../types/index";

//Función que genera un resultado aleatorio para la misión.
function generateResult() {
  return Math.random() === 1 ? 'Success' : 'Failure';
}



export default function Missions(){

  //Importo las funciones y estados que necesitaré para las misiones
  const {addCredits, crew, fuel, reduceFuel} = useShip();


  //Saco los panetas para usarlos en el formulario

  const [planets, setPlanets] = useState<ILocation[]>([]);

  //Por asincronía tengo que hacer un useEffect para que al cargar el componente espere al fetch de los planetas
  useEffect(() => {
    const fetchPlanets = async () => {
      const data = await getLocations();
      setPlanets(data.results);
    };
    fetchPlanets();
  }, []);

  //Función que se ejecuta al enviar el formulario de la misión. 
  function startMission() {

    //Obtengo los datos 
    //Combustible que se va a usar (entre 15% y 40%)
    let wastedFuel: number = Math.floor(Math.random() * (40 - 15 + 1)) + 15;

    //Si falta combustible la misión será cancelada, si no será victoria o derrota
    let result: String;
    if (wastedFuel > fuel) {
      result = 'Cancelled';
    } else {
      result = generateResult();
    }

    if (result === 'Success') {
      reduceFuel(wastedFuel);
    } else if (result === 'Failure') {
      reduceFuel(wastedFuel);
    }
    
  }


  return (
    <form onSubmit={startMission}>
      <label htmlFor="crew"></label>
        <select name="crew" id="crew">
        {crew.map(crewMate => (
          <option key={crewMate.id} value={crewMate.id}>{crewMate.name}</option>
        ))}
      </select>
      <label htmlFor="planet"></label>
        <select name="planet" id="planet">
        {planets.map(planet => (
          <option key={planet.name} value={planet.name}>{planet.name}</option>
        ))}
      </select>

      <button type="submit" disabled={fuel <= 0}>{fuel <= 0 ? 'No fuel' : 'Send'}</button>
      
    </form>
  );

}