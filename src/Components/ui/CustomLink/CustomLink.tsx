import { NavLink, useLocation } from "react-router-dom";
import styles from "./CustomLink.module.css";

interface CustomLinkProps {
  to: string;
  children: React.ReactNode;
}

const CustomLink = ({ to, children }: CustomLinkProps): JSX.Element => {
  const location = useLocation();

  // Custom logic to set "Contacts" as active for both "/" and "/contacts"
  const isActive =
    (to === "/contacts" &&
      (location.pathname === "/" || location.pathname === "/contacts")) ||
    location.pathname === to;

  return (
    <NavLink to={to} className={isActive ? styles.active : styles.inactive}>
      {children}
    </NavLink>
  );
};

export default CustomLink;
