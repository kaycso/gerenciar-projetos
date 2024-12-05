import { NavLink } from "react-router";

const Navbar = () => {
  const isActiveLink = (isActive) => (isActive ? "ativo" : "desativado");

  return (
    <nav>
      <NavLink to="/" className={isActiveLink}>
        Home
      </NavLink>
      <NavLink to="/company" className={isActiveLink}>
        Company
      </NavLink>
      <NavLink to="/newproject" className={isActiveLink}>
        NewProject
      </NavLink>
    </nav>
  );
};

export default Navbar;


