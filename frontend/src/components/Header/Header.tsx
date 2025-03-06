import cn from "classnames";
import { FC } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { tabletWidth } from "../../config";
import styles from "./Header.module.scss";
import { topBarLinks } from "./config";

export const Header: FC = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const isNotOnMobile = window.innerWidth >= tabletWidth;
  // const onDesktop = window.innerWidth >= desktopWidth;
  const isLoggedIn = false;

  if (pathname === "/menu") {
    return (
      <header className={cn(styles["header"], styles["header--on-menu"])}>
        <Link to="/" className={styles["header__logo"]} />
        <button
          className={styles["header__exit"]}
          onClick={() => navigate("/")}
        />
      </header>
    );
  }

  return (
    <header className={styles["header"]}>
      {isNotOnMobile ? (
        <nav className={styles["navigation"]}>
          <ul className={styles["header__list"]}>
            {topBarLinks.map((link) => (
              <li key={link.id} className={styles["header__list-item"]}>
                <NavLink
                  className={({ isActive }) => {
                    return cn(styles["header__link"], {
                      [styles["header__link--active"]]: isActive,
                    });
                  }}
                  to={link.link}
                >
                  {link.title}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      ) : null}
      <Link to="/" className={styles["header__logo"]} />
      <div className={styles["header__btns-wrap"]}>
        <button className={styles["header__search"]}></button>
        <button className={styles["header__favorites"]}></button>
        {!isNotOnMobile ? (
          <button
            className={styles["header__menu"]}
            onClick={() => navigate("/menu")}
          ></button>
        ) : null}

        {isNotOnMobile ? (
          <button className={styles["header__profile"]}></button>
        ) : null}

        {!isLoggedIn && isNotOnMobile ? (
          <Link to="/login" className={styles["header__login"]}>
            log in
          </Link>
        ) : null}
      </div>
    </header>
  );
};
