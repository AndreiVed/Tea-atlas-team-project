import { FC, useEffect } from "react";
import { GeneralInput } from "../../../../components/GeneralInput";
import {
  updateLoginError,
  updateLoginForm,
} from "../../../../features/login/loginSlice";
import { useAppDispatch, useAppSelector } from "../../../../store/hooks";
import { GeneralInput as GeneralInputType } from "../../../../types/GeneralInput";
import { LoginForm } from "../../../../types/LoginForm";

export const LoginInput: FC<Omit<GeneralInputType, "onChange">> = (props) => {
  const { name } = props;
  const dispatch = useAppDispatch();
  
  const { loginForm, loginError } = useAppSelector((state) => state.login);
  const inputValue = loginForm[name as keyof LoginForm];


  useEffect(() => {
    console.log(loginForm);
  }, [loginForm]);

  const handleChange = (name: string, value: string) => {
    dispatch(updateLoginForm({ [name]: value }));
  };

  const handleFocus = () => {
    if (loginError) {
      dispatch(updateLoginError(""));
    }

  };

  return (
    <GeneralInput
      {...props}
      value={inputValue}
      onChange={handleChange}
      onFocus={handleFocus}
    />
  );
};
