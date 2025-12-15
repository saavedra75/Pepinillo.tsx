import { useShip } from "../hooks/useShip";
import "../styles/Dashboard.css";

export default function Dashboard(){
    const { credits, fuel, crew } = useShip();
    
    return (
      <div className="container">
        {fuel === 0 && (
          <div className="alert">
            <h2>⚠️ NAVE A LA DERIVA</h2>
            <p>El combustible se ha agotado. No puedes continuar.</p>
          </div>
        )}

        <div className="dashboard panel">
          <h2>RESUMEN VISUAL</h2>
          <div className="stat">CRÉDITOS: <span className="credits">{credits}</span></div>
          <div className="stat">COMBUSTIBLE: <span className={fuel >= 60 ? "fuel-high" : (fuel <= 25 ? "fuel-low" : "fuel-medium")}>{fuel}%</span></div>
          <div className="stat">TRIPULACIÓN: <span className="crew">[{crew.length}]</span></div>
        </div>

        <div className="crewContainer panel">
          <h2>LISTADO TRIPULACIÓN</h2>

          {crew.length === 0 ? (
            <p className="empty">No hay tripulación asignada. Ve a la Cantina para contratar.</p>
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