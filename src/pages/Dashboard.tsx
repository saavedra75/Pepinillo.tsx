import { useShip } from "../hooks/useShip";

export default function Dashboard(){
    const { credits, fuel, crew } = useShip();
    
    return (
        <div>
          <h2>Dashboard</h2>
          <p>Credits: {credits}</p>
          <p>Fuel: {fuel}</p>
          <p>Crew: {crew.length}</p>
        </div>
    );

}