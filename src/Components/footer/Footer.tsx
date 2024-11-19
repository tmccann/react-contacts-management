import styles from "./Footer.module.css";
import CustomLink from "../ui/CustomLink/CustomLink";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <p>&copy; {new Date().getFullYear()} Contact Manager</p>
      <ul>
        {/* Nav links will be used thes are temp placeholder */}
        <li>
          <CustomLink to="/about">About</CustomLink>
        </li>
        <li>
          <CustomLink to="/privacy">Privacy</CustomLink>
        </li>
        <li>
          <CustomLink to="/terms"> Terms</CustomLink>
        </li>
      </ul>
    </footer>
  );
};

export default Footer;
