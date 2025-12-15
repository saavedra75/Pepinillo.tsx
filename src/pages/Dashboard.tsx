import { useShip } from "../hooks/useShip";

export default function Dashboard(){
    const { credits, fuel, crew } = useShip();
    
    return (
        <div>
          <div>
            <p>Credits: {credits}</p>
            <p>Fuel: {fuel}</p>
            <p>Crew: {crew.length}</p>
          </div>
          <div>
            <h2>Crew Members:</h2>
            <ul>
              {crew.map((member, index) => (
                <li key={index}>
                  <img src={member.image} alt={member.name}/>
                </li>
              ))}
            </ul>
          </div>
        </div>
    );

}