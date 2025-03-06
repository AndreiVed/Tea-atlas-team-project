import { FC } from "react";
import { Link, useLocation } from "react-router-dom";
import styles from "./Footer.module.scss";
import { footerLinks } from "./config";

export const Footer: FC = () => {
  const { pathname } = useLocation();

  if (pathname === "/menu") {
    return null;
  }

  return (
    <footer className={styles["footer"]}>
      <nav className={styles["footer__navigation"]}>
        <ul className={styles["footer__list"]}>
          {footerLinks.map((link) => (
            <li key={link.id} className={styles["footer__list-item"]}>
              <Link className={styles["footer__link"]} to={link.link}>
                {link.title}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      <Link to="/" className={styles["footer__logo"]} />
    </footer>
  );
};
