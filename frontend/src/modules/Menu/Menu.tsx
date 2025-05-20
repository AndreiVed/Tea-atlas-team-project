import { GeneralButton } from "@/components/GeneralButton/GeneralButton";
import { userInfoDefaults } from "@/constants/formsInitials";
import { menuLinks } from "@/constants/links";
import { profileActions } from "@/features/profile/profileSlice";
import { clearTokens } from "@/handlers/clearTokens";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import cn from "classnames";
import { FC } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./Menu.module.scss";

export const Menu: FC = () => {
  const { updateIsLoggedIn, updateUserInfo } = profileActions;
  const { isLoggedIn } = useAppSelector((state) => state.profile);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleLogout = () => {
    navigate("/");
    dispatch(updateIsLoggedIn(false));
    dispatch(updateUserInfo(userInfoDefaults));
    localStorage.removeItem("user");
    clearTokens();
  };

  return (
    <div className={styles["menu"]}>
      <nav className={styles["menu__navigation"]}>
        <ul className={styles["menu__list"]}>
          {menuLinks.map((link) => (
            <li
              key={link.id}
              className={cn(styles["menu__list-item"], {
                [styles["menu__list-item--contact"]]: link.title === "contact",
              })}
            >
              <Link to={link.link} className={styles["menu__link"]}>
                {link.title}
              </Link>
            </li>
          ))}
          {isLoggedIn ? (
            <li
              className={cn(
                styles["menu__list-item"],
                styles["menu__list-item--profile"]
              )}
            >
              <Link to="/profile" className={styles["menu__link"]}>
                profile
              </Link>
            </li>
          ) : null}
        </ul>
      </nav>
      {isLoggedIn ? (
        <GeneralButton type="text" text="LOG OUT" onClick={handleLogout} />
      ) : (
        <GeneralButton type="primary" text="LOG IN" to="/login" />
      )}
    </div>
  );
};
