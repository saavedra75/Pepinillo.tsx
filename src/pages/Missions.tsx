import { ShipContext } from "../context/ShipContext";
import { useShip } from "../hooks/useShip";
import '../styles/Missions.css';

//Función que genera un resultado aleatorio para la misión.
function generateResult() {
  return Math.random() === 1 ? 'Victory' : 'Defeat';
}



export default function Missions(){

//Importo las funciones y estados que necesitaré para las misiones
const {credits, crew, fuel, reduceFuel, spendCredits} = useShip();

  //Función que se ejecuta al enviar el formulario de la misión. 
  function startMission() {

    //Obtengo los datos 
    //Combustible que se va a usar (entre 15% y 40%)
    let wastedFuel: number = Math.floor(Math.random() * (40 - 15 + 1)) + 15;

    //Si falta combustible la misión será cancelada, si no será victoria o derrota
    if (wastedFuel > fuel) {
      let result: string = 'Cancelled';
    } else {
      let result: string = generateResult();
    }

    
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
          <option value="" disabled selected>
            Select destination
          </option>
          <option value="Earth">Earth</option>
          <option value="Mars">Mars</option>
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

    </form>
  </div>
);

 

}