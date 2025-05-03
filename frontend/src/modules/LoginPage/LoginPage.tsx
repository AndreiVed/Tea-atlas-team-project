import { useWindowSize } from "@uidotdev/usehooks";
import { FC, FormEvent, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

import { useCursorEffect } from "../../hooks/useCursorEffect";
import { useScroll } from "../../hooks/useScroll";
import { useAppDispatch, useAppSelector } from "../../store/hooks";

import { GeneralButton } from "../../components/GeneralButton";
import { LoginInput } from "./components/LoginInput";

import cn from "classnames";
import { isEmailCorrect } from "../../components/GeneralInput/handlers";
import { API_ENDPOINTS, screenEndpoints } from "../../endpoints";

import {
  updateLoginError,
  updateLoginForm,
} from "../../features/login/loginSlice";
import { updateLikedProducts } from "../../features/products/productsSlice";
import {
  updateIsLoggedIn,
  updateToken,
  updateUserInfo,
} from "../../features/profile/profileSlice";

import { LoginResponseData } from "../../types/LoginResponseData";

import styles from "./LoginPage.module.scss";

export const LoginPage: FC = () => {
  const { width } = useWindowSize();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { handleMouseEnter, handleMouseLeave } = useCursorEffect();

  const { loginForm, loginError } = useAppSelector((state) => state.login);
  const { email, password } = loginForm;

  const isOnDesktop = width ? width >= screenEndpoints.desktop : undefined;
  const isSubmitDisabled = !isEmailCorrect(email) || password.length < 8;

  useScroll({ options: { top: 0, behavior: "smooth" } });

  useEffect(() => {
    return () => {
      dispatch(
        updateLoginForm({
          email: "",
          password: "",
        })
      );
      dispatch(updateLoginError(""));
    };
  }, [dispatch]);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    fetch(API_ENDPOINTS.auth.login, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(loginForm),
    })
      .then((response) => {
        if (response.status === 400) {
          dispatch(updateLoginError("Email or password is incorrect"));
          dispatch(updateLoginForm({ email: "", password: "" }));

          return;
        }

        return response.json();
      })
      .then((data: LoginResponseData) => {
        const { access, user, refresh } = data;

        localStorage.setItem("refresh", refresh);
        dispatch(updateToken(access));
        dispatch(updateUserInfo(user));
        localStorage.setItem("user", JSON.stringify(user));
        localStorage.setItem("access_token", access);
        dispatch(updateIsLoggedIn(true));
        dispatch(updateLoginForm({ email: "", password: "" }));
        navigate("/");

        fetch(API_ENDPOINTS.auth.favoriteList, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${access}`,
          },
        })
          .then((response) => {
            if (!response.ok) {
              throw new Error("Something went wrong.");
            }

            return response.json();
          })
          .then((data) => {
            dispatch(updateLikedProducts(data));
            localStorage.setItem("likedProducts", data);
          });
      });
  };

  const handleGoogleAuth = () => {
    window.location.href = "http://127.0.0.1:8000/api/v1/google_auth/redirect/";
  };

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
          <div className={styles["login__google"]} onClick={handleGoogleAuth}>
            <GeneralButton
              type="secondary"
              text="Google"
              icon="/icons/socials/google.svg"
            />
          </div>
          <div className={styles["login__with-divider"]}>
            <p className={styles["login__with-divider-text"]}>or</p>
          </div>
        </div>

        <form
          className={styles["login__form"]}
          action=""
          onSubmit={handleSubmit}
          noValidate
        >
          <div className={styles["login__form-inputs-wrap"]}>
            <LoginInput
              type="email"
              placeholder="Enter your email"
              title="Email"
              name="email"
              value={email}
            />
            <LoginInput
              type="password"
              placeholder="Enter your password"
              title="Password"
              name="password"
              value={password}
            />
          </div>
          {loginError ? (
            <h4 className={styles["login__form-error-message"]}>
              {loginError.toString()}
            </h4>
          ) : null}

          <div className={styles["login__form-sign-in-btn-wrap"]}>
            <GeneralButton
              isSubmit
              type={"secondary"}
              text="SIGN IN"
              isDisabled={isSubmitDisabled}
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
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            Sign up
          </Link>
        </div>
      </div>
    </section>
  );
};
