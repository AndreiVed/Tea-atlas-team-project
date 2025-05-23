import { GeneralInput } from "@/components/GeneralInput";
import { updateLoginError, updateLoginForm } from "@/features/login/loginSlice";
import { isEmailCorrect } from "@/handlers/isEmailCorrect";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { GeneralInput as GeneralInputType } from "@/types/GeneralInput";
import { LoginForm } from "@/types/LoginForm";
import { FC, useState } from "react";

export const LoginInput: FC<Omit<GeneralInputType, "onChange">> = (props) => {
  const { name, value } = props;
  const dispatch = useAppDispatch();

  const { loginForm, loginError } = useAppSelector((state) => state.login);
  const inputValue = loginForm[name as keyof LoginForm];
  const [localError, setLocalError] = useState("");

  const handleChange = (name: string, value: string) => {
    dispatch(updateLoginForm({ [name]: value }));
  };

  const handleFocus = () => {
    if (loginError) {
      dispatch(updateLoginError(""));
    }

    if (localError) {
      setLocalError("");
    }
  };

  const handleBlur = () => {
    if (name === "email" && !isEmailCorrect(value)) {
      setLocalError("Please, type correct e-mail address");
    } else {
      setLocalError("");
    }
  };

  return (
    <GeneralInput
      {...props}
      value={inputValue}
      onChange={handleChange}
      onFocus={handleFocus}
      onBlur={handleBlur}
      error={localError}
    />
  );
};
