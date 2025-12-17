import React, { useEffect, useState } from "react";
import { useShip } from "../hooks/useShip";
import { getLocations } from "../services/rickAndMortyService";
import type { ILocation } from "../types/index";
import "../styles/Missions.css";
import MissionResult from "../components/ResultMission";

//Función que genera un resultado aleatorio para la misión.
function generateResult() {
  return Math.random() < 0.75 ? "Success" : "Failure";
}

export default function Missions() {
  //Importo las funciones y estados que necesitaré para las misiones
  const { addCredits, crew, fuel, reduceFuel, saveMission } = useShip();

  //Estado de la misión. Al enviar el formulario este contexto cambia, el useEffect reacciona al cambio,
  //espera los 3 segundos y ejecuta lo necesario
  const [missionFlag, setMissionFlag] = useState(false);

  //Estado del temporizador
  const [time, setTimer] = useState(0);

  //Saco los panetas para usarlos en el formulario
  const [planets, setPlanets] = useState<ILocation[]>([]);

  //Member enviado a la misión
  const [sentMemberId, setSentMemberId] = useState<number>(0);

  //Planeta al que se va en la misión
  const [currPlanetId, setCurrPlanetId] = useState<number>(0);

  //Por asincronía tengo que hacer un useEffect para que al cargar el componente espere al fetch de los planetas
  useEffect(() => {
    const fetchPlanets = async () => {
      const data = await getLocations();
      setPlanets(data.results);
    };
    fetchPlanets();
  }, []);

  //Efecto que gestiona el temporizador y el resultado de la misión
  useEffect(() => {
    if (!missionFlag) return;

    setTimer(3); // empezamos desde 3 segundos

    const interval = setInterval(() => {
      setTimer((prev) => {
        if (prev <= 1) {
          clearInterval(interval);

          // Aquí va la lógica que tenías en el setTimeout
          let wastedFuel: number = Math.floor(Math.random() * (40 - 15 + 1)) + 15;
          let result: string;

          if (wastedFuel > fuel) {
            result = "Cancelled";
            wastedFuel = 0;
          } else {
            result = generateResult();
          }

          reduceFuel(wastedFuel);

          let addedCredits = 0;
          if (result === "Success") {
            addedCredits =
              Math.floor(Math.random() * (500 - 250 + 1)) + 250;
          }

          addCredits(addedCredits);
          saveMission({ result, wastedFuel, addedCredits });
          setMissionFlag(false);

          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [missionFlag]);

  //Función que inicia la misión al enviar el formulario
  const startMission = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setMissionFlag(true);
  };

  return (
    <div className="missionPage">
      <form className="missionForm" onSubmit={startMission}>
        <h2 className="formTitle">START MISSION</h2>

        <div className="selectGroup">
          <select
            name="crew"
            id="crew"
            required
            defaultValue=""
            onChange={(e) => setSentMemberId(Number(e.target.value))}
          >
            <option value="" disabled>
              Select crew member
            </option>
            {crew.map((crewMate) => (
              <option key={crewMate.id} value={crewMate.id}>
                {crewMate.name}
              </option>
            ))}
          </select>
          <span className="selectGlow"></span>
          <label htmlFor="crew">Crew</label>
        </div>

        <div className="selectGroup">
          <select
            name="planet"
            id="planet"
            required
            defaultValue=""
            onChange={(e) => setCurrPlanetId(Number(e.target.value))}
          >
            <option value="" disabled>
              Select destination
            </option>
            {planets.map((planet) => (
              <option key={planet.id} value={planet.id}>
                {planet.name}
              </option>
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
            
      {missionFlag && (
        <div className="mission-timer">
          Launching in {time}...
        </div>
      )}

      <MissionResult />
    </div>
  );
}
