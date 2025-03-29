import cn from "classnames";
import { FC } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "../../components/Button/Button";
import { FormField } from "../../components/FormField";
import { useScroll } from "../../hooks/useScroll";
import styles from "./SignUpPage.module.scss";

export const SignUpPage: FC = () => {
  const navigate = useNavigate();
  useScroll({ options: { top: 0, behavior: "smooth" } });

  return (
    <section className={styles["sign-up"]}>
      <img
        className={styles["sign-up__banner"]}
        src="/banners/loginpage/registration.jpg"
        alt="Registration banner"
      />
      <div className={styles["sign-up__info-wrap"]}>
        <div className={styles["sign-up__top"]}>
          <button
            className={styles["sign-up__back-btn"]}
            onClick={() => navigate("/login")}
          />
          <h3 className={styles["sign-up__title"]}>Sign up to Atlas Tea</h3>
        </div>
        <form className={styles["sign-up__form"]} action="">
          <div className={styles["sign-up__double-input-wrap"]}>
            <FormField type="text" title="First name" placeholder="Jenny" />
            <FormField type="text" title="Last name" placeholder="Wilson" />
          </div>
          <div className={styles["sign-up__form-email-wrap"]}>
            <FormField
              type="email"
              title="Email"
              placeholder="Enter your email"
              required={true}
            />
          </div>
          <div className={styles["sign-up__double-input-wrap"]}>
            <FormField
              type="text"
              title="Password"
              placeholder="Create password"
              required={true}
            />
            <FormField
              type="text"
              title="Repeat password"
              placeholder="Repeat password"
              required={true}
            />
          </div>
          <div className={styles["sign-up__sign-up-btn-wrap"]}>
            <Button type="primary" text="sign up" />
          </div>
        </form>
        <div className={styles["sign-up__have-account"]}>
          <p
            className={cn(
              styles["sign-up__have-account-question"],
              "small-text"
            )}
          >
            Already have an account?{" "}
          </p>
          <Link
            className={cn(styles["sign-up__have-account-link"], "small-text")}
            to={"/login"}
          >
            Sign in
          </Link>
        </div>
        <div className={styles["sign-up__privacy-notice"]}>
          <p className="small-text">
            By signing up, you agree to the{" "}
            <Link
              className={cn(
                styles["sign-up__privacy-notice-link"],
                "small-text"
              )}
              to="/privacy-notice"
            >
              Privacy Notice
            </Link>{" "}
            , and{" "}
            <Link
              className={cn(
                styles["sign-up__privacy-notice-link"],
                "small-text"
              )}
              to="/cookies"
            >
              Cookies notice
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
};
