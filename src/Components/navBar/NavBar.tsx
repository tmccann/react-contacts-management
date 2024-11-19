import { useLocation } from "react-router-dom";
import CustomLink from "../ui/CustomLink/CustomLink";
import styles from "./NavBar.module.css";

const NavBar = () => {
  //set h1 depending on location
  const { pathname } = useLocation();

  const getPageTitle = () => {
    if (pathname === "/") {
      return "Contacts";
    }
    const path = pathname.slice(1);
    const header = path.charAt(0).toUpperCase() + path.slice(1);
    return header; // Remove the leading slash and capitalize first letter
  };

  return (
    <nav className={styles.nav}>
      <h1>{getPageTitle()}</h1>
      {/* add Links */}
      <ul>
        <li>
          <CustomLink to="/contacts">Contacts</CustomLink>
        </li>
        <li>
          <CustomLink to="/appointments">Appointments</CustomLink>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
