import cn from "classnames";
import { FC } from "react";
import { Link, useLocation } from "react-router-dom";
import { footerLinks } from "../../constants/links";
import { pagesWithoutFooter } from "../../constants/pagesWithoutFooter";
import { shouldHideComponent } from "../../handlers/shouldHideComponent";
import { useCursorEffect } from "../../hooks/useCursorEffect";
import styles from "./Footer.module.scss";

export const Footer: FC = () => {
  const { handleMouseEnter, handleMouseLeave } = useCursorEffect();
  const { pathname } = useLocation();

  if (shouldHideComponent(pagesWithoutFooter, pathname)) {
    return null;
  }

  return (
    <footer className={styles["footer"]}>
      <div className={styles["footer__links-wrap"]}>
        <nav className={styles["footer__navigation"]}>
          <ul className={styles["footer__list"]}>
            {footerLinks.map((link) => (
              <li key={link.id} className={styles["footer__list-item"]}>
                <Link
                  className={styles["footer__link"]}
                  to={link.link}
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                >
                  {link.title}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <Link
          to="/"
          className={styles["footer__logo"]}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        />
      </div>
      <div className={styles["footer__rights-container"]}>
        <img
          className={styles["footer__rights-container-photo"]}
          src="/icons/rights.svg"
          alt="C"
        />
        <span
          className={cn(
            styles["footer__rights-container-brand-name"],
            "small-text"
          )}
        >
          ATLAS TEA
        </span>
        <span
          className={cn(styles["footer__rights-container-text"], "small-text")}
        >
          All rights reserved
        </span>
      </div>
    </footer>
  );
};
