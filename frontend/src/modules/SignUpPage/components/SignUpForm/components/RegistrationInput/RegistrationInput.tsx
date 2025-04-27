// import { FC, useEffect, useState } from "react";
// import { GeneralInput } from "../../../../../../components/GeneralInput";
// import { isEmailCorrect } from "../../../../../../components/GeneralInput/handlers";
// import {
//   updateInputErrors,
//   updatePasswordRequirements,
//   updateRegistrationForm,
// } from "../../../../../../features/registration/registrationSlice";
// import { allPasswordRequirementsCorrect } from "../../../../../../handlers/allPasswordRequirementsCorrect";
// import { useAppDispatch, useAppSelector } from "../../../../../../store/hooks";
// import { GeneralInput as GeneralInputType } from "../../../../../../types/GeneralInput";
// import { RegistrationForm } from "../../../../../../types/RegistrationForm";

// export const RegistrationInput: FC<Omit<GeneralInputType, "onChange">> = (
//   props
// ) => {
//   const [localError, setLocalError] = useState("");
//   const dispatch = useAppDispatch();
//   const { form, passwordRequirements, inputErrors } = useAppSelector(
//     (state) => state.registration
//   );
//   const isPassword2Disabled = Object.values(passwordRequirements).some(
//     (req) => !req
//   );
//   const value = form[props.name as keyof RegistrationForm];

//   const { type } = props;

//   useEffect(() => {
//     if (inputErrors[props.name as keyof typeof inputErrors]) {
//       setLocalError(inputErrors[props.name as keyof typeof inputErrors]);
//     } else {
//       setLocalError("");
//     }
//   }, [inputErrors, props.name]);

//   // we clean password2 value if it is disabled
//   useEffect(() => {
//     if (isPassword2Disabled && localError) {
//       setLocalError("");
//     }

//     if (isPassword2Disabled && form.password2.length) {
//       dispatch(updateRegistrationForm({ password2: "" }));
//     }
//   }, [form.password1]);

//   const handleChange = (name: string, value: string) => {
//     dispatch(updateRegistrationForm({ [name]: value }));
//     const { length } = value;

//     // if (type === "email" && length > 3 && !isEmailCorrect(value)) {
//     //   setLocalError("Please, type correct e-mail");
//     // } else {
//     //   setLocalError("");
//     // }

//     if (name === "password1") {
//       dispatch(
//         updatePasswordRequirements({
//           isLetterTyped: /[A-Za-z]/.test(value),
//           isMinLength: length >= 8,
//           isNumberTyped: /[0-9]/.test(value),
//         })
//       );
//     }
//   };

//   const handleBlur = () => {
//     if (
//       props.name === "password2" &&
//       allPasswordRequirementsCorrect(passwordRequirements) &&
//       form.password1 !== value &&
//       value.length
//     ) {
//       setLocalError("Passwords do not match");
//     } else {
//       setLocalError("");
//     }

//     if (type === "email" && !isEmailCorrect(value)) {
//       setLocalError("Please, type correct e-mail");
//     } else {
//       setLocalError("");
//     }
//   };

//   const hasInputError = (propertyName: keyof RegistrationForm): boolean => {
//     return inputErrors[propertyName].length > 0;
//   };

//   const handleFocus = () => {
//     if (props.name === "password1" && hasInputError("password1")) {
//       dispatch(updateInputErrors({ password1: "" }));
//     }

//     if (props.name === "email" && hasInputError("email")) {
//       setLocalError("");
//       dispatch(updateInputErrors({ email: "" }));
//     }
//   };

//   const isDisabled =
//     !allPasswordRequirementsCorrect(passwordRequirements) &&
//     props.name === "password2";

//   return (
//     <GeneralInput
//       {...props}
//       error={localError}
//       value={value}
//       disabled={isDisabled}
//       onChange={handleChange}
//       onFocus={handleFocus}
//       onBlur={handleBlur}
//     />
//   );
// };

import { FC } from "react";
import { GeneralInput } from "../../../../../../components/GeneralInput";
import { isEmailCorrect } from "../../../../../../components/GeneralInput/handlers";
import { updatePasswordRequirements } from "../../../../../../features/password/passwordSlice";
import {
  updateRegistrationErrors,
  updateRegistrationForm,
  updateSignUpError,
} from "../../../../../../features/registration/registrationSlice";
import { allPasswordRequirementsCorrect } from "../../../../../../handlers/allPasswordRequirementsCorrect";
import { validatePasswordRequirements } from "../../../../../../handlers/validatePasswordRequirements";
import { useAppDispatch, useAppSelector } from "../../../../../../store/hooks";
import { GeneralInput as GeneralInputType } from "../../../../../../types/GeneralInput";
import { RegistrationForm } from "../../../../../../types/RegistrationForm";

export const RegistrationInput: FC<Omit<GeneralInputType, "onChange">> = (
  props
) => {
  const dispatch = useAppDispatch();
  const { registrationForm, registrationErrors, signUpError } = useAppSelector(
    (state) => state.registration
  );
  const { passwordRequirements } = useAppSelector((state) => state.password);

  // const isPassword2Disabled = Object.values(passwordRequirements).some(
  //   (req) => !req
  // );
  const value = registrationForm[props.name as keyof RegistrationForm];
  const { type } = props;

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
    } else if (props.name === "password2") {
      dispatch(updateRegistrationErrors({ password2: "" }));
    }

    if (type === "email") {
      if (!isEmailCorrect(value)) {
        dispatch(
          updateRegistrationErrors({ email: "Please, type correct e-mail" })
        );
      } else {
        dispatch(updateRegistrationErrors({ email: "" }));
      }
    }
  };

  const handleFocus = () => {
    if (props.name === "password1" && registrationErrors.password1) {
      dispatch(updateRegistrationErrors({ password1: "" }));
    }

    if (props.name === "email" && registrationErrors.email) {
      dispatch(updateRegistrationErrors({ email: "" }));
    }

    if (props.name === "password2" && registrationErrors.password2) {
      dispatch(updateRegistrationErrors({ password2: "" }));
    }

    if (signUpError) {
      dispatch(updateSignUpError(""));
    }
  };

  const isDisabled =
    !allPasswordRequirementsCorrect(passwordRequirements) &&
    props.name === "password2";

  const error =
    registrationErrors[props.name as keyof typeof registrationErrors] || "";

  return (
    <GeneralInput
      {...props}
      error={error}
      value={value}
      disabled={isDisabled}
      onChange={handleChange}
      onFocus={handleFocus}
      onBlur={handleBlur}
    />
  );
};
