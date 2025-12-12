import { Link, Outlet } from "react-router-dom";
const Navbar = () => {
  return (
    <>
      <nav style={{ display: "flex", justifyContent: "space-around" }}>
        <Link to="/">Dashboard</Link>
        <Link to="/hirecrew">HireCrew</Link>
        <Link to="/missions">Missions</Link>
      </nav>
      <Outlet />
    </>
  );
};
export default Navbar;