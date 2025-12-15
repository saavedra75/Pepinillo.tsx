import { ShipContext } from "../context/ShipContext";
import { useShip } from "../hooks/useShip";


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
    <form onSubmit={startMission}>
      <label htmlFor="crew"></label>
        <select name="crew" id="crew">
        {crew.map(crewMate => (
          <option value={crewMate.id}>{crewMate.name}</option>
        ))}
      </select>
      <label htmlFor="planet"></label>
        <select name="planet" id="planet">
        {/* Aquí mapearé los planetas */}
        <option value={"Earth"}>Earth</option>
        <option value={"Mars"}>Mars</option>
      </select>

      <button type="submit" disabled={fuel <= 0}>{fuel <= 0 ? 'No fuel' : 'Send'}</button>
      
    </form>
  );

}