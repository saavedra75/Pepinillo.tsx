import { useShip } from "../hooks/useShip";
import "../styles/Dashboard.css";

export default function Dashboard(){
    const { credits, fuel, crew, clearMember, refuel, mission } = useShip();
    
    return (
      <div className="container">

      <div className="missionHistory panel missionPanel">
        <h2>LAST MISSION SUMMARY</h2>

        {mission.result !== "None" ? (
          <div className="missionContent">

            <div className="missionResultBox">
              <p className="missionLabel">RESULT</p>
              <p className="missionValue">{mission.result}</p>
            </div>

            <div className="missionStatsRow">
              <div className="missionStat">
                <span className="missionStatLabel">CREDITS</span>
                <span className="missionStatValue">+{mission.addedCredits}</span>
              </div>

              <div className="missionStat">
                <span className="missionStatLabel">FUEL</span>
                <span className="missionStatValue">-{mission.wastedFuel}</span>
              </div>
            </div>

            <div className="missionCrewBox">
              <p className="missionCrewLabel">CREW MEMBER</p>
              <p className="missionCrewName">{mission.crewMember?.name}</p>
            </div>

          </div>
        ) : (
          <p className="empty">No missions completed yet.</p>
        )}
      </div>


        <div className="dashboard panel">
          <h2>DASHBOARD</h2>

          <div className="stat">
            CREDITS: <span className="credits">{credits}</span>
          </div>

          {fuel > 15 && (
            <div className="stat fuelStat">
              FUEL: 
              <span className={fuel >= 60 ? "fuel-high" : fuel <= 25 ? "fuel-low" : "fuel-medium"}>
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
            <button className="refuelBtn" style={{alignSelf:"center" }} onClick={refuel}>
              Refuel (250 CREDITS)
            </button>
          )}

          {fuel <= 15 && (
            <div className="alert">
              <h2>⚠️ SHIP ADRIFT ⚠️</h2>
              <p>The fuel has run out and the ship is adrift in space. Refuel to continue your journey!</p>
              <button className="refuelBtn" onClick={refuel}>
                Refuel (250 CREDITS)
              </button>
            </div>
          )}

          <div className="stat">
            CREW: <span className="crew">[{crew.length}]</span>
          </div>
        </div>

        <div className="crewContainer panel">
          <h2>CREW LIST</h2>

          {crew.length === 0 ? (
            <p className="empty">There is no crew assigned. Go to 'Hire Crew' to hire.</p>
          ) : (
            <ul className="crewList">
              {crew.map((member) => (
                <li key={member.id} className="crewMember">
                  <img src={member.image} alt={member.name} />
                  <span>{member.name}</span>
                  <button className="deleteCrewBtn" onClick={() => clearMember(member.id)}>
                    Clear Member
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

      </div>
    );
}