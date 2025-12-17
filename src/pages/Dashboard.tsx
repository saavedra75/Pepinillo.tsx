import { useShip } from "../hooks/useShip";
import "../styles/Dashboard.css";

/**
 * Dashboard
 * ----------
 * Página principal del panel de control de la nave.
 * Muestra:
 *  - Resumen de la última misión
 *  - Estado actual de créditos y combustible
 *  - Lista de tripulación
 *
 * Todos los datos provienen del contexto global (ShipContext).
 */
export default function Dashboard() {

  // Extraemos del contexto todos los datos y funciones necesarias
  const { credits, fuel, crew, clearMember, refuel, mission } = useShip();

  return (
    <div className="container">

      {/* PANEL: RESUMEN DE LA MISIÓN */}
      <div className="missionHistory panel missionPanel">
        <h2>LAST MISSION SUMMARY</h2>

        {/* Si existe una misión registrada, la mostramos */}
        {mission.result !== "None" ? (
          <div className="missionContent">

            {/* Resultado general de la misión */}
            <div className="missionResultBox">
              <p className="missionLabel">RESULT</p>
              <p className="missionValue">{mission.result}</p>
            </div>

            {/* Créditos ganados y combustible gastado */}
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

            {/* Miembro de la tripulación que participó */}
            <div className="missionCrewBox">
              <p className="missionCrewLabel">CREW MEMBER</p>
              <p className="missionCrewName">{mission.crewMember?.name}</p>
            </div>

          </div>
        ) : (
          // Si no hay misión registrada
          <p className="empty">No missions completed yet.</p>
        )}
      </div>

      {/* ============================
          PANEL: ESTADO DE LA NAVE
         ============================ */}
      <div className="dashboard panel">
        <h2>DASHBOARD</h2>

        {/* Créditos actuales */}
        <div className="stat">
          CREDITS: <span className="credits">{credits}</span>
        </div>

        {/* Barra de combustible si queda más de 15% */}
        {fuel > 15 && (
          <div className="stat fuelStat">
            FUEL:
            <span className={
              fuel >= 60 ? "fuel-high" :
              fuel <= 25 ? "fuel-low" :
              "fuel-medium"
            }>
              {fuel}%
            </span>

            {/* Barra visual del combustible */}
            <div className="progressBar">
              <div
                className="progressFill fuelFill"
                style={{ width: `${fuel}%` }}
              ></div>
            </div>
          </div>
        )}

        {/* Botón de recarga si el combustible está bajo pero no crítico */}
        {fuel < 25 && fuel > 15 && (
          <button className="refuelBtn" style={{ alignSelf: "center" }} onClick={refuel}>
            Refuel (250 CREDITS)
          </button>
        )}

        {/* Alerta crítica si el combustible está agotado */}
        {fuel <= 15 && (
          <div className="alert">
            <h2>⚠️ SHIP ADRIFT ⚠️</h2>
            <p>The fuel has run out and the ship is adrift in space. Refuel to continue your journey!</p>
            <button className="refuelBtn" onClick={refuel}>
              Refuel (250 CREDITS)
            </button>
          </div>
        )}

        {/* Número de miembros en la tripulación */}
        <div className="stat">
          CREW: <span className="crew">[{crew.length}]</span>
        </div>
      </div>

      {/* ============================
          PANEL: LISTA DE TRIPULACIÓN
         ============================ */}
      <div className="crewContainer panel">
        <h2>CREW LIST</h2>

        {/* Si no hay tripulación */}
        {crew.length === 0 ? (
          <p className="empty">There is no crew assigned. Go to 'Hire Crew' to hire.</p>
        ) : (
          <ul className="crewList">

            {/* Renderizamos cada miembro de la tripulación */}
            {crew.map((member) => (
              <li key={member.id} className="crewMember">
                <img src={member.image} alt={member.name} />
                <span>{member.name}</span>

                {/* Botón para eliminar miembro */}
                <button
                  className="deleteCrewBtn"
                  onClick={() => clearMember(member.id)}
                >
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
