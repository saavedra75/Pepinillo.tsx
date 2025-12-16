import { useShip } from "../hooks/useShip";
import "../styles/Dashboard.css";

export default function Dashboard(){
    const { credits, fuel, crew, clearCrew, refuel } = useShip();
    
    return (
      <div className="container">

        <div className="dashboard panel">
          <h2>DASHBOARD</h2>

          <div className="stat">
            CREDITS: <span className="credits">{credits}</span>
          </div>

          {fuel > 15 && (
            <div className="stat">
              FUEL: <span className={fuel >= 60 ? "fuel-high" : fuel <= 25 ? "fuel-low" : "fuel-medium"}>
                {fuel}%
              </span>

              <div className="progressBar">
                <div
                  className="progressFill fuelFill"
                  style={{ width: `${fuel}%` }}
                ></div>
              </div>
            </div>
          )}


          {fuel < 25 && fuel > 15 && (
              <button className="refuelBtn" style={{width:"25%", alignSelf:"center"}} onClick={() => refuel()}>
                Refuel (250 CREDITS)
              </button>
          )}

          {fuel <= 15 && (
              <div className="alert">
                <h2>⚠️ SHIP ADRIFT ⚠️</h2>
                <p>The fuel has run out and the ship is adrift in space. Refuel to continue your journey!</p>
                <button className="refuelBtn" onClick={() => refuel()}>
                  Refuel (250 CREDITS)
                </button>
              </div>
          )}

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
          <button className="deleteCrewBtn" onClick={clearCrew}>
            Clear Crew
          </button>
        </div>
      </div>
    );
}