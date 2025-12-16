import { NavLink, Outlet } from "react-router-dom";
import "../App.css";

const Navbar = () => {
  return (
    <>
      <nav className="space-navbar">
        <div className="nav-logo">
          🥒 PEPINILLO.TSX
        </div>

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

      <Outlet />
    </>
  );
};

export default Navbar;
