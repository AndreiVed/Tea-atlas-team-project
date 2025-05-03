import { FC, useState } from "react";
import { GeneralInput } from "../../../../../../components/GeneralInput";
import { isEmailCorrect } from "../../../../../../components/GeneralInput/handlers";
import { updatePasswordRequirements } from "../../../../../../features/password/passwordSlice";
import {
  updateEditingForm,
  updateEditingPassword,
} from "../../../../../../features/profile/profileSlice";
import { allPasswordRequirementsCorrect } from "../../../../../../handlers/allPasswordRequirementsCorrect";
import { validatePasswordRequirements } from "../../../../../../handlers/validatePasswordRequirements";
import { useAppDispatch, useAppSelector } from "../../../../../../store/hooks";
import { GeneralInput as GeneralInputType } from "../../../../../../types/GeneralInput";

export const EditingInput: FC<Omit<GeneralInputType, "onChange">> = (props) => {
  const dispatch = useAppDispatch();
  const [localError, setLocalError] = useState("");
  const { editingForm, editingPassword } = useAppSelector(
    (state) => state.profile
  );
  const { new_password1, new_password2 } = editingPassword;

  const { name, value } = props;
  const { passwordRequirements } = useAppSelector((state) => state.password);

  const isPasswordField = name === "new_password1" || name === "new_password2";
  const currentForm = isPasswordField ? editingPassword : editingForm;
  const currentValue = currentForm[name as keyof typeof currentForm];

  const handleChange = (name: string, value: string) => {
    if (currentForm === editingPassword) {
      dispatch(updateEditingPassword({ ...editingPassword, [name]: value }));
    } else {
      dispatch(updateEditingForm({ ...editingForm, [name]: value }));
    }

    if (name === "email" && localError && isEmailCorrect(value)) {
      setLocalError("");
    }

    if (name === "new_password1") {
      dispatch(updatePasswordRequirements(validatePasswordRequirements(value)));
    }
  };

  const handleBlur = () => {
    if (name === "email" && !isEmailCorrect(value)) {
      setLocalError("Please, type correct email");
    }

    if (name === "new_password2" && new_password1 !== new_password2) {
      setLocalError("Passwords do not match");
    }

    if (
      name === "new_password2" &&
      !allPasswordRequirementsCorrect(passwordRequirements) &&
      localError
    ) {
      setLocalError("");
    }
  };

  const handleFocus = () => {
    if (localError) {
      setLocalError("");
    }
  };

  const isDisabled = () => {
    return (
      name === "new_password2" &&
      !allPasswordRequirementsCorrect(passwordRequirements)
    );
  };

  return (
    <GeneralInput
      {...props}
      value={currentValue}
      onChange={handleChange}
      error={localError}
      onBlur={handleBlur}
      onFocus={handleFocus}
      disabled={isDisabled()}
    />
  );
};
