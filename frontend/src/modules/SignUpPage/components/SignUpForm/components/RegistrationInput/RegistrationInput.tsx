import { GeneralInput } from "@/components/GeneralInput";
import { updatePasswordRequirements } from "@/features/password/passwordSlice";
import { registrationActions } from "@/features/registration/registrationSlice";
import { allPasswordRequirementsCorrect } from "@/handlers/allPasswordRequirementsCorrect";
import { isEmailCorrect } from "@/handlers/isEmailCorrect";
import { validatePasswordRequirements } from "@/handlers/validatePasswordRequirements";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { GeneralInput as GeneralInputType } from "@/types/GeneralInput";
import { RegistrationForm } from "@/types/RegistrationForm";
import { FC, useEffect } from "react";

type Props = Omit<GeneralInputType, "onChange">;

export const RegistrationInput: FC<Props> = (props) => {
  const {
    updateRegistrationForm,
    updateRegistrationErrors,
    updateSignUpError,
  } = registrationActions;

  const dispatch = useAppDispatch();
  const { registrationForm, registrationErrors, signUpError } = useAppSelector(
    (state) => state.registration
  );
  const { passwordRequirements } = useAppSelector((state) => state.password);
  const value = registrationForm[props.name as keyof RegistrationForm];
  const { type } = props;

  const isPassword2Disabled = Object.values(passwordRequirements).some(
    (req) => !req
  );

  // Clean password2 value if requirements aren't met
  useEffect(() => {
    if (isPassword2Disabled && registrationForm.password2.length) {
      dispatch(updateRegistrationForm({ password2: "" }));
      dispatch(updateRegistrationErrors({ password2: "" }));
    }
  }, [registrationForm.password1]);

  const handleChange = (name: string, value: string) => {
    dispatch(updateRegistrationForm({ [name]: value }));

    if (name === "password1") {
      dispatch(updatePasswordRequirements(validatePasswordRequirements(value)));
    }
  };

  const handleBlur = () => {
    if (
      props.name === "password2" &&
      allPasswordRequirementsCorrect(passwordRequirements) &&
      registrationForm.password1 !== value &&
      value.length
    ) {
      dispatch(
        updateRegistrationErrors({ password2: "Passwords do not match" })
      );
    }

    if (type === "email" && !isEmailCorrect(value)) {
      dispatch(
        updateRegistrationErrors({ email: "Please, type correct e-mail" })
      );
    }
  };

  const handleFocus = () => {
    if (registrationErrors[props.name as keyof typeof registrationErrors]) {
      dispatch(updateRegistrationErrors({ [props.name]: "" }));
    }

    if (signUpError) {
      dispatch(updateSignUpError(""));
    }
  };

  const isDisabled =
    !allPasswordRequirementsCorrect(passwordRequirements) &&
    props.name === "password2";

  return (
    <GeneralInput
      {...props}
      error={
        registrationErrors[props.name as keyof typeof registrationErrors] || ""
      }
      value={value}
      disabled={isDisabled}
      onChange={handleChange}
      onFocus={handleFocus}
      onBlur={handleBlur}
    />
  );
};
