import { useWindowSize } from "@uidotdev/usehooks";
import cn from "classnames";
import { FC, useState } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { endpoints } from "../../config";
import { headerTopBarLinks } from "../../constants/links";
import { changeShowSearch } from "../../features/search/searchSlice";
import { shouldHideComponent } from "../../handlers/shouldHideComponent";
import { useCursorEffect } from "../../hooks/useCursorEffect";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { Search } from "../Search";
import styles from "./Header.module.scss";
import { ProfileModal } from "./components/ProfileModal";

export const Header: FC = () => {
  const { handleMouseEnter, handleMouseLeave } = useCursorEffect();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { width } = useWindowSize();
  const dispatch = useAppDispatch();
  const showSearch = useAppSelector((state) => state.search.showSearch);
  const [openProfileModal, setOpenProfileModal] = useState(false);

  const isNotOnMobile = width ? width >= endpoints.tablet : undefined;
  const isLoggedIn = true;
  const pagesPathsWithoutHeader = ["/login", "/sign-up"];

  if (shouldHideComponent(pagesPathsWithoutHeader, pathname)) {
    return null;
  }

  if (pathname === "/menu") {
    return (
      <header className={cn(styles["header"], styles["header--on-menu"])}>
        <Link
          to="/"
          className={styles["header__logo"]}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        />
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
            {headerTopBarLinks.map((link) => (
              <li key={link.id} className={styles["header__list-item"]}>
                <NavLink
                  className={({ isActive }) => {
                    return cn(styles["header__link"], {
                      [styles["header__link--active"]]: isActive,
                    });
                  }}
                  to={link.link}
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                >
                  {link.title}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      ) : null}
      <Link
        to="/"
        className={styles["header__logo"]}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      />
      <div className={styles["header__btns-wrap"]}>
        <button
          className={cn(styles["header__search"], {
            [styles["header__search--opened"]]: showSearch,
          })}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onClick={() => dispatch(changeShowSearch(true))}
        ></button>
        <button
          className={cn(styles["header__favorites"], {
            [styles["header__favorites--active"]]: pathname === "/liked-it",
          })}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onClick={() => navigate("/liked-it")}
        />
        {!isNotOnMobile ? (
          <button
            className={styles["header__menu"]}
            onClick={() => navigate("/menu")}
          ></button>
        ) : null}

        {isNotOnMobile ? (
          <div className={styles["header__profile"]}>
            <button
              className={cn(styles["header__profile-open"], {
                [styles["header__profile-open--active"]]:
                  openProfileModal || pathname === "/profile",
              })}
              onClick={() => {
                setOpenProfileModal(true);
              }}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            ></button>
            {openProfileModal ? (
              <ProfileModal setOpenProfileModal={setOpenProfileModal} />
            ) : null}
          </div>
        ) : null}

        {!isLoggedIn && isNotOnMobile ? (
          <Link
            to="/login"
            className={styles["header__login"]}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            log in
          </Link>
        ) : null}
      </div>

      {showSearch ? <Search /> : null}
    </header>
  );
};
