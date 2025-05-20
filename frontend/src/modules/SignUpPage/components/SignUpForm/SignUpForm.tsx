import { GeneralButton } from "@/components/GeneralButton/GeneralButton";
import { API_ENDPOINTS } from "@/constants/endpoints";
import { formDefaults as formDefs } from "@/constants/formsInitials";
import { updatePasswordRequirements } from "@/features/password/passwordSlice";
import { registrationActions } from "@/features/registration/registrationSlice";
import { allPasswordRequirementsCorrect } from "@/handlers/allPasswordRequirementsCorrect";
import { isEmailCorrect } from "@/handlers/isEmailCorrect";
import { useCursorEffect } from "@/hooks/useCursorEffect";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import cn from "classnames";
import { FC, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { GoBackButton } from "../GoBackButton";
import styles from "./SignUpForm.module.scss";
import { RegistrationInput } from "./components/RegistrationInput";

export const SignUpForm: FC = () => {
  const {
    updateConfirmationEmail,
    updateRegistrationErrors,
    updateRegistrationForm,
    updateSignUpError,
  } = registrationActions;

  const { registrationFormDefaults, passwordRequirementsDefaults } = formDefs;

  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [isPending, setIsPending] = useState(false);
  const { handleMouseEnter, handleMouseLeave } = useCursorEffect();

  const { registrationForm, signUpError, registrationErrors } = useAppSelector(
    (state) => state.registration
  );
  const { passwordRequirements } = useAppSelector((state) => state.password);

  const { password1, password2, email, first_name, last_name } =
    registrationForm;

  const isSubmitDisabled =
    !isEmailCorrect(email) ||
    !allPasswordRequirementsCorrect(passwordRequirements) ||
    password1 !== password2;

  useEffect(() => {
    return () => {
      dispatch(updateRegistrationForm(registrationFormDefaults));
      dispatch(updateRegistrationErrors({}));
      dispatch(updatePasswordRequirements(passwordRequirementsDefaults));
    };
  }, []);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setIsPending(true);

    fetch(API_ENDPOINTS.auth.registration, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(registrationForm),
    })
      .then((response) => {
        if (!response.ok) {
          return response.json().then((res) => {
            dispatch(updateRegistrationErrors(res));
          });
        }

        return response.json();
      })
      .then(() => {
        if (Object.values(registrationErrors).some((error) => !error)) {
          setIsPending(false);

          return;
        }

        navigate("/sign-up/confirmation-sent");
        dispatch(updatePasswordRequirements(passwordRequirementsDefaults));
        dispatch(updateConfirmationEmail(email));
      })
      .catch((error) => {
        dispatch(updateSignUpError(String(error)));
        setIsPending(false);
      });
  };

  return (
    <div className={styles["sign-up__info-wrap"]}>
      <div className={styles["sign-up__top"]}>
        <GoBackButton to="/login" />
        <h3 className={styles["sign-up__title"]}>Sign up to Atlas Tea</h3>
      </div>
      <form
        className={styles["sign-up__form"]}
        action=""
        onSubmit={handleSubmit}
        noValidate
      >
        <div className={styles["sign-up__double-input-wrap"]}>
          <RegistrationInput
            type="text"
            title="First name"
            placeholder="Jenny"
            name="first_name"
            value={first_name}
          />

          <RegistrationInput
            type="text"
            title="Last name"
            placeholder="Wilson"
            name="last_name"
            value={last_name}
          />
        </div>
        <div className={styles["sign-up__form-email-wrap"]}>
          <RegistrationInput
            type="email"
            title="Email"
            placeholder="Enter your email"
            name="email"
            value={email}
            required
          />
        </div>
        <div className={styles["sign-up__double-input-wrap"]}>
          <RegistrationInput
            type="password"
            title="Password"
            placeholder="Create password"
            name="password1"
            showPasswordRequirements
            value={password1}
            required
          />
          <RegistrationInput
            type="password"
            title="Repeat password"
            placeholder="Repeat password"
            name="password2"
            value={password2}
            required
          />
        </div>
        <div className={styles["sign-up__sign-up-btn-wrap"]}>
          <GeneralButton
            isSubmit
            type="primary"
            text="SIGN UP"
            isLoading={isPending}
            isDisabled={isSubmitDisabled}
          />
        </div>
      </form>
      <div className={styles["sign-up__have-account"]}>
        <p
          className={cn(styles["sign-up__have-account-question"], "small-text")}
        >
          Already have an account?{" "}
        </p>
        <Link
          className={cn(styles["sign-up__have-account-link"], "small-text")}
          to={"/login"}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          Sign in
        </Link>
      </div>
      <div className={styles["sign-up__privacy-notice"]}>
        <p className="small-text">
          By signing up, you agree to the{" "}
          <Link
            className={cn(styles["sign-up__privacy-notice-link"], "small-text")}
            to="/privacy-notice"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            Privacy Notice
          </Link>{" "}
          , and{" "}
          <Link
            className={cn(styles["sign-up__privacy-notice-link"], "small-text")}
            to="/cookies"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            Cookies notice
          </Link>
        </p>
      </div>
      {signUpError ? (
        <h3 className={styles["sign-up__error"]}>
          Something went wrong. Please try again
        </h3>
      ) : null}
    </div>
  );
};
