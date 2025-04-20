import cn from "classnames";
import { FC } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { useScroll } from "../../hooks/useScroll";
import styles from "./SignUpPage.module.scss";

export const SignUpPage: FC = () => {
  useScroll({ options: { top: 0, behavior: "smooth" } });
  const { pathname } = useLocation();

  return (
    <section
      className={cn(styles["sign-up"], {
        [styles["sign-up--confirmation-sent"]]:
          pathname === "/sign-up/confirmation-sent",
      })}
    >
      <img
        className={styles["sign-up__banner"]}
        src="/banners/loginpage/registration.jpg"
        alt="Registration banner"
      />
      <Outlet />
    </section>
  );
};
