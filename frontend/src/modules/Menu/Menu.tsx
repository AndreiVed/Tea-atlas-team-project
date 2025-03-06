import cn from "classnames";
import { FC } from "react";
import { Link } from "react-router-dom";
import { Button } from "../../components/Button/Button";
import styles from "./Menu.module.scss";
import { menuLinks } from "./config";

export const Menu: FC = () => {
  const isLoggedIn = true;

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
        <Button type="text" text="log out" />
      ) : (
        <Button type="primary" text="log in" />
      )}
    </div>
  );
};
