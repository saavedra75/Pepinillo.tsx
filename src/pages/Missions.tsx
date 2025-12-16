import { useEffect, useState } from "react";
import { ShipContext } from "../context/ShipContext";
import { useShip } from "../hooks/useShip";
import { getLocations } from "../services/rickAndMortyService";
import type { ILocation } from "../types/index";
import '../styles/Missions.css';
import MissionResult from '../components/missionResult';
import type { IMissionSum } from '../types/index';

//Función que genera un resultado aleatorio para la misión.
function generateResult() {
  return Math.random() < 0.75 ? 'Success' : 'Failure';
}

  //Estado de la mision para ir renderizando el resumen
  
  
  
  export default function Missions(){
    
    const [missionSum, setMissionSum] = useState <IMissionSum>({result: '', wastedFuel: 0, addedCredits: 0})
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
    let result: string;
    if (wastedFuel > fuel) {
      result = 'Cancelled';
      wastedFuel = 0;
    } else {
      result = generateResult();
    }

    reduceFuel(wastedFuel);

    let addedCredits: number = 0;
    if (result === 'Success') {
      addedCredits = Math.floor(Math.random() * (500 - 250 + 1)) + 250;
    }

    addCredits(addedCredits);

    
    setMissionSum({result: result, wastedFuel: wastedFuel, addedCredits: addedCredits})




    }
    

return (
  <div className="missionPage">
    <form className="missionForm" onSubmit={startMission}>
      <h2 className="formTitle">START MISSION</h2>

      <div className="selectGroup">
        <select name="crew" id="crew" required>
          <option value="" disabled selected>
            Select crew member
          </option>
          {crew.map(crewMate => (
            <option key={crewMate.id} value={crewMate.id}>
              {crewMate.name}
            </option>
          ))}
        </select>
        <span className="selectGlow"></span>
        <label htmlFor="crew">Crew</label>
      </div>

      <div className="selectGroup">
        <select name="planet" id="planet" required>
          <option value="" disabled selected>Select destination</option>
        {planets.map(planet => (
          <option key={planet.name} value={planet.name}>{planet.name}</option>
        ))}
        </select>
        <span className="selectGlow"></span>
        <label htmlFor="planet">Planet</label>
      </div>

      <button
        type="submit"
        className={`submitBtn ${fuel <= 0 ? "disabled" : ""}`}
        disabled={fuel <= 0}
      >
        {fuel <= 0 ? "NO FUEL" : "SEND MISSION"}
      </button>
      <MissionResult></MissionResult>

    </form>
  </div>
);

 

}