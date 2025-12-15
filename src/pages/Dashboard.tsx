import { useShip } from "../hooks/useShip";
import "../styles/Dashboard.css";

export default function Dashboard(){
    const { credits, fuel, crew } = useShip();
    
    return (
      <div className="container">
        {fuel === 0 && (
          <div className="alert">
            <h2>⚠️ NAVE A LA DERIVA</h2>
            <p>The fuel has run out and the ship is adrift in space. Refuel to continue your journey!</p>
          </div>
        )}

        <div className="dashboard panel">
          <h2>DASHBOARD</h2>
          <div className="stat">CREDITS: <span className="credits">{credits}</span></div>
          <div className="stat">FUEL: <span className={fuel >= 60 ? "fuel-high" : (fuel <= 25 ? "fuel-low" : "fuel-medium")}>{fuel}%</span></div>
          <div className="stat">CREW: <span className="crew">[{crew.length}]</span></div>
        </div>

        <div className="crewContainer panel">
          <h2>CREW LIST</h2>

          {crew.length === 0 ? (
            <p className="empty">There is no crew assigned. Go to 'Hire Crew' to hire.</p>
          ) : (
            <ul className="crewList">
              {crew.map((member, index) => (
                <li key={index} className="crewMember">
                  <img src={member.image} alt={member.name} />
                  <span>{member.name}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    );
} 