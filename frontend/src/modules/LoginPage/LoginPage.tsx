import { useWindowSize } from "@uidotdev/usehooks";
import cn from "classnames";
import { FC, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "../../components/Button/Button";
import { FormField } from "../../components/FormField";
import { endpoints } from "../../config";
import { setLoginForm } from "../../features/forms/formsSlice";
import { useScroll } from "../../hooks/useScroll";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import styles from "./LoginPage.module.scss";

export const LoginPage: FC = () => {
  const { width } = useWindowSize();
  const isOnDesktop = width ? width >= endpoints.desktop : undefined;
  const dispatch = useAppDispatch();
  const { email, password } = useAppSelector((state) => state.forms.loginForm);
  const isFormFilled = email?.length > 5 && password?.length > 8;

  useScroll({ options: { top: 0, behavior: "smooth" }});

  useEffect(() => {
    return () => {
      dispatch(setLoginForm({ email: "", password: "" }));
    };
  }, [dispatch]);

  return (
    <section className={styles["login"]}>
      {isOnDesktop ? (
        <img
          className={styles["login__banner"]}
          src="/banners/loginpage/registration.jpg"
          alt="Registration"
        />
      ) : null}
      <div className={styles["login__info-wrap"]}>
        <h3 className={styles["login__title"]}>Sign In to Atlas Tea</h3>
        <div className={styles["login__with"]}>
          <p className={styles["login__with-text"]}>Sign in with:</p>
          <div className={styles["login__with-buttons"]}>
            <Button
              type="secondary"
              text="google"
              icon="/icons/socials/google.svg"
              alt="google"
            />
            <Button
              type="secondary"
              text="apple"
              icon="/icons/socials/apple.svg"
              alt="apple"
            />
            <Button
              type="secondary"
              text="facebook"
              icon="/icons/socials/facebook.svg"
              alt="facebook"
            />
          </div>
          <div className={styles["login__with-divider"]}>
            <p className={styles["login__with-divider-text"]}>or</p>
          </div>
        </div>

        <form className={styles["login__form"]} action="">
          <div className={styles["login__form-inputs-wrap"]}>
            <FormField
              type="email"
              placeholder="Enter your email"
              title="Email"
            />
            <FormField
              type="text"
              placeholder="Enter your password"
              title="Password"
            />
          </div>
          <p
            className={cn(
              styles["login__form-forgot-password"],
              styles["additional-text"]
            )}
          >
            Forgot your password?
          </p>
          <div className={styles["login__form-sign-in-btn-wrap"]}>
            <Button
              type={isFormFilled ? "primary" : "secondary"}
              text="sign in"
            />
          </div>
        </form>
        <div className={styles["login__dont-have-account"]}>
          <p
            className={cn(
              styles["login__dont-have-account-question"],
              "small-text"
            )}
          >
            Don't have an account?
          </p>
          <Link
            to={"/sign-up"}
            className={cn(
              styles["login__dont-have-account-sign-up"],
              "small-text"
            )}
          >
            Sign up
          </Link>
        </div>
      </div>
    </section>
  );
};
