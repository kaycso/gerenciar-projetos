import { NavLink } from "react-router";

const Navbar = () => {
  const isActiveLink = ({ isActive }) => {
    return isActive
      ? "font-medium text-amber-400 underline underline-offset-4"
      : "font-medium";
  };

  return (
    <nav>
      <ul className="flex items-center gap-6 text-white">
        <li>
          <NavLink to="/" className={isActiveLink}>
            Home
          </NavLink>
        </li>
        <li>
          <NavLink to="/projects" className={isActiveLink}>
            Projetos
          </NavLink>
        </li>
        <li>
          <NavLink to="/contact" className={isActiveLink}>
            Contato
          </NavLink>
        </li>
        <li>
          <NavLink to="/company" className={isActiveLink}>
            Empresa
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
