import { NavLink, Outlet } from "react-router-dom";
import "../App.css";
import { useShip } from "../hooks/useShip";

const Navbar = () => {
   const {credits, fuel}=useShip(); //uso creditos y fuel del useShip para usarlos en el navbar
   
  return (
    <>
      <nav className="space-navbar">
        <div className="nav-logo">
          🥒 PEPINILLO.TSX
        </div>

        <div className="nav-stats">
          <span className="stat credits">💰 CREDITS {credits}</span>
          <span className="stat fuel">⛽FUEL {fuel}</span>
        </div>
      
        {/**Enlaces a cada componente */}
        <div className="nav-links"> 
          <NavLink to="/" className="nav-link">
            Dashboard
          </NavLink>
          <NavLink to="/hirecrew" className="nav-link">
            Hire Crew
          </NavLink>
          <NavLink to="/missions" className="nav-link">
            Missions
          </NavLink>
        </div>
      </nav>

      <Outlet /> {/**Renderiza el componente de la ruta actual(activa)*/}
    </>
  );
};

export default Navbar;
