import { ShipContext } from "../context/ShipContext";
import { useShip } from "../hooks/useShip";



export default function Missions(){

/**
 * Requisitos:
 * - Acceder al contexto de la nave (crew, credits y fuel)
 * - Acceder a los planetas de la API
 * - 
 */

//Formulario para realizar una misión 

const {credits, crew, fuel, reduceFuel, spendCredits} = useShip();
  credits;
  spendCredits(0);


  return (
    <form>
      <label htmlFor="crew"></label>
        <select name="crew" id="crew">
        {crew.map(crewMate => (
          <option value={crewMate.id}>{crewMate.name}</option>
        ))}
      </select>
      <label htmlFor="planet"></label>
        <select name="planet" id="planet">
        {/* Aquí mapearé los planetas */}
      </select>

      
    </form>
  );

}