import { screenEndpoints } from "@/constants/endpoints";
import { headerTopBarLinks } from "@/constants/links";
import { pagesPathsWithoutHeader } from "@/constants/pagesWithoutHeader";
import { updateShowLoginRequiredModal } from "@/features/modal/modalSlice";
import { updateShowSearch } from "@/features/search/searchSlice";
import { shouldHideComponent } from "@/handlers/shouldHideComponent";
import { useCursorEffect } from "@/hooks/useCursorEffect";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { useWindowSize } from "@uidotdev/usehooks";
import cn from "classnames";
import { FC, useState } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { LoginRequiredModal } from "../LoginRequiredModal";
import { Search } from "../Search";
import styles from "./Header.module.scss";
import { ProfileModal } from "./components/ProfileModal";

export const Header: FC = () => {
  const { handleMouseEnter, handleMouseLeave } = useCursorEffect();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { width } = useWindowSize();
  const dispatch = useAppDispatch();
  const { showSearch } = useAppSelector((state) => state.search);
  const { showLoginRequiredModal } = useAppSelector((state) => state.modal);
  const [openProfileModal, setOpenProfileModal] = useState(false);
  const { isLoggedIn } = useAppSelector((state) => state.profile);

  const isNotOnMobile = width ? width >= screenEndpoints.tablet : undefined;

  if (shouldHideComponent(pagesPathsWithoutHeader, pathname)) {
    return null;
  }

  const handleLikedItClick = () => {
    if (!isLoggedIn) {
      dispatch(updateShowLoginRequiredModal(true));

      return;
    }

    navigate("/liked-it");
  };

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
      <div className={styles["header-wrap"]}>
        {isNotOnMobile && (
          <nav className={styles["navigation"]}>
            <ul className={styles["header__list"]}>
              {headerTopBarLinks.map((link) => {
                const { id, link: to, title } = link;

                return (
                  <li key={id} className={styles["header__list-item"]}>
                    <NavLink
                      className={({ isActive }) => {
                        return cn(styles["header__link"], {
                          [styles["header__link--active"]]: isActive,
                        });
                      }}
                      to={to}
                      onMouseEnter={handleMouseEnter}
                      onMouseLeave={handleMouseLeave}
                    >
                      {title}
                    </NavLink>
                  </li>
                );
              })}
            </ul>
          </nav>
        )}
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
            onClick={() => dispatch(updateShowSearch(true))}
          />
          <button
            className={cn(styles["header__favorites"], {
              [styles["header__favorites--active"]]: pathname === "/liked-it",
            })}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onClick={handleLikedItClick}
          />
          {!isNotOnMobile && (
            <button
              className={styles["header__menu"]}
              onClick={() => navigate("/menu")}
            />
          )}

          {isLoggedIn && isNotOnMobile && (
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
              />
              {openProfileModal && (
                <ProfileModal setOpenProfileModal={setOpenProfileModal} />
              )}
            </div>
          )}

          {!isLoggedIn && isNotOnMobile && (
            <Link
              to="/login"
              className={styles["header__login"]}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              log in
            </Link>
          )}
        </div>
      </div>

      {showSearch && <Search />}
      {showLoginRequiredModal && <LoginRequiredModal />}
    </header>
  );
};
