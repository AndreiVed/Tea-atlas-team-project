import { FC, useState } from "react";
import { GeneralInput } from "../../../../../../components/GeneralInput";
import { isEmailCorrect } from "../../../../../../components/GeneralInput/handlers";
<<<<<<< HEAD
=======
import { updatePasswordRequirements } from "../../../../../../features/password/passwordSlice";
>>>>>>> 9097e19ed81b64e0788f0c94f5cf1ce56aecfc09
import {
  updateEditingForm,
  updateEditingPassword,
} from "../../../../../../features/profile/profileSlice";
<<<<<<< HEAD
=======
import { allPasswordRequirementsCorrect } from "../../../../../../handlers/allPasswordRequirementsCorrect";
import { validatePasswordRequirements } from "../../../../../../handlers/validatePasswordRequirements";
>>>>>>> 9097e19ed81b64e0788f0c94f5cf1ce56aecfc09
import { useAppDispatch, useAppSelector } from "../../../../../../store/hooks";
import { GeneralInput as GeneralInputType } from "../../../../../../types/GeneralInput";

export const EditingInput: FC<Omit<GeneralInputType, "onChange">> = (props) => {
  const dispatch = useAppDispatch();
  const [localError, setLocalError] = useState("");
<<<<<<< HEAD

  const { editingForm, editingPassword } = useAppSelector(
    (state) => state.profile
  );
  const { name, value } = props;
=======
  const { editingForm, editingPassword } = useAppSelector(
    (state) => state.profile
  );
  const { new_password1, new_password2 } = editingPassword;

  const { name, value } = props;
  const { passwordRequirements } = useAppSelector((state) => state.password);
>>>>>>> 9097e19ed81b64e0788f0c94f5cf1ce56aecfc09

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
<<<<<<< HEAD
=======

    if (name === "new_password1") {
      dispatch(updatePasswordRequirements(validatePasswordRequirements(value)));
    }
>>>>>>> 9097e19ed81b64e0788f0c94f5cf1ce56aecfc09
  };

  const handleBlur = () => {
    if (name === "email" && !isEmailCorrect(value)) {
      setLocalError("Please, type correct email");
    }
<<<<<<< HEAD
  }
=======

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
>>>>>>> 9097e19ed81b64e0788f0c94f5cf1ce56aecfc09

  return (
    <GeneralInput
      {...props}
      value={currentValue}
      onChange={handleChange}
      error={localError}
      onBlur={handleBlur}
<<<<<<< HEAD
=======
      onFocus={handleFocus}
      disabled={isDisabled()}
>>>>>>> 9097e19ed81b64e0788f0c94f5cf1ce56aecfc09
    />
  );
};
