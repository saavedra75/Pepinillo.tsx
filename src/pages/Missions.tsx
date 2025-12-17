import React, { useEffect, useState } from "react";
import { ShipContext } from "../context/ShipContext";
import { useShip } from "../hooks/useShip";
import { getLocations } from "../services/rickAndMortyService";
import type { ICharacter, ILocation } from "../types/index";
import '../styles/Missions.css';
import MissionResult from '../components/ResultMission';
import type { IMissionSum } from '../types/index';
import { getCharacterById } from "../services/rickAndMortyService";
import { getLocationById } from "../services/rickAndMortyService";

  //Función que genera un resultado aleatorio para la misión.
  function generateResult() {
    return Math.random() < 0.75 ? 'Success' : 'Failure';
  }

  export default function Missions(){
      //Importo las funciones y estados que necesitaré para las misiones
  const {addCredits, crew, fuel, reduceFuel, mission, saveMission} = useShip();

  //Estado de la misión. Al enviar el formulario este contexto cambia, el useEffect reacciona al cambio,
  //espera los 3 segundos y ejecuta lo necesario

  const [missionFlag, setMissionFlag] = useState(false);

  //Saco los panetas para usarlos en el formulario
  const [planets, setPlanets] = useState<ILocation[]>([]);

  //Member enviado a la misión
  const [sentMemberId, setSentMemberId] = useState <number>(0);
 
  //Planeta al que se va en la misión
  const [currPlanetId, setCurrPlanetId] = useState<number>(0);


  const [countDown, setCountDown] = useState(3);
  //Por asincronía tengo que hacer un useEffect para que al cargar el componente espere al fetch de los planetas

  useEffect(() => {
    const fetchPlanets = async () => {
      const data = await getLocations();
      setPlanets(data.results);
    };
    fetchPlanets();
  }, []);

  useEffect(() => {
    const fetchPlanets = async () => {
      const data = await getLocations();
      setPlanets(data.results);
    };
    fetchPlanets();
  }, []);

  useEffect(() => {
    if (!missionFlag) return;

    const timer = setTimeout(async ()=> {

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


    const crewMember = await getCharacterById(sentMemberId);
    const location = await getLocationById(currPlanetId);

    saveMission({result, wastedFuel, addedCredits, crewMember, location});
    setMissionFlag(false);
  }, 3000);

    return () => clearTimeout(timer);

  }, [missionFlag]);

  //Función que se ejecuta al enviar el formulario de la misión. 
  function startMission(e: React.FormEvent) {
    e.preventDefault();
    
    setMissionFlag(true); //Para que el useEffect reaccione y realice la lógica
  }
    

return (
  <div className="missionPage">
    <form className="missionForm" onSubmit={startMission}>
      <h2 className="formTitle">START MISSION</h2>

      <div className="selectGroup">
        {/*Al cambiar  el valor del select le manda el id al estado del miembro*/}
        <select name="crew" id="crew" required onChange={(e) => setSentMemberId(Number (e.target.value))}>
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
        <select name="planet" id="planet" required onChange={(e) => setCurrPlanetId(Number (e.target.value))}>
          <option value="" disabled selected>Select destination</option>
        {planets.map(planet => (
          <option key={planet.id} value={planet.id}>{planet.name}</option>
        ))}
        </select>
        <span className="selectGlow"></span>
        <label htmlFor="planet">Planet</label>
      </div>

      <button
        type="submit"
        className={`submitBtn ${fuel <= 14 ? "disabled" : ""}`}
        disabled={fuel <= 0}
      >
        {fuel <= 14 ? "NO FUEL" : "SEND MISSION"}
      </button>
    </form>
    <MissionResult></MissionResult>
  </div>
);

}