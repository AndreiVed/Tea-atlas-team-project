import { FC, useState } from "react";
import { GeneralInput } from "../../../../../../components/GeneralInput";
import { isEmailCorrect } from "../../../../../../components/GeneralInput/handlers";
import {
  updateEditingForm,
  updateEditingPassword,
} from "../../../../../../features/profile/profileSlice";
import { useAppDispatch, useAppSelector } from "../../../../../../store/hooks";
import { GeneralInput as GeneralInputType } from "../../../../../../types/GeneralInput";

export const EditingInput: FC<Omit<GeneralInputType, "onChange">> = (props) => {
  const dispatch = useAppDispatch();
  const [localError, setLocalError] = useState("");

  const { editingForm, editingPassword } = useAppSelector(
    (state) => state.profile
  );
  const { name, value } = props;

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
  };

  const handleBlur = () => {
    if (name === "email" && !isEmailCorrect(value)) {
      setLocalError("Please, type correct email");
    }
  }

  return (
    <GeneralInput
      {...props}
      value={currentValue}
      onChange={handleChange}
      error={localError}
      onBlur={handleBlur}
    />
  );
};
