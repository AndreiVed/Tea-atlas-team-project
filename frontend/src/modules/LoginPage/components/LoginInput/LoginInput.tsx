<<<<<<< HEAD
import { FC, useEffect } from "react";
import { GeneralInput } from "../../../../components/GeneralInput";
=======
import { FC, useState } from "react";

import { GeneralInput } from "../../../../components/GeneralInput";

import { isEmailCorrect } from "../../../../components/GeneralInput/handlers";

>>>>>>> 9097e19ed81b64e0788f0c94f5cf1ce56aecfc09
import {
  updateLoginError,
  updateLoginForm,
} from "../../../../features/login/loginSlice";
<<<<<<< HEAD
import { useAppDispatch, useAppSelector } from "../../../../store/hooks";
=======

import { useAppDispatch, useAppSelector } from "../../../../store/hooks";

>>>>>>> 9097e19ed81b64e0788f0c94f5cf1ce56aecfc09
import { GeneralInput as GeneralInputType } from "../../../../types/GeneralInput";
import { LoginForm } from "../../../../types/LoginForm";

export const LoginInput: FC<Omit<GeneralInputType, "onChange">> = (props) => {
<<<<<<< HEAD
  const { name } = props;
  const dispatch = useAppDispatch();
  
  const { loginForm, loginError } = useAppSelector((state) => state.login);
  const inputValue = loginForm[name as keyof LoginForm];


  useEffect(() => {
    console.log(loginForm);
  }, [loginForm]);
=======
  const { name, value } = props;
  const dispatch = useAppDispatch();

  const { loginForm, loginError } = useAppSelector((state) => state.login);
  const inputValue = loginForm[name as keyof LoginForm];
  const [localError, setLocalError] = useState("");
>>>>>>> 9097e19ed81b64e0788f0c94f5cf1ce56aecfc09

  const handleChange = (name: string, value: string) => {
    dispatch(updateLoginForm({ [name]: value }));
  };

  const handleFocus = () => {
    if (loginError) {
      dispatch(updateLoginError(""));
    }

<<<<<<< HEAD
=======
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
>>>>>>> 9097e19ed81b64e0788f0c94f5cf1ce56aecfc09
  };

  return (
    <GeneralInput
      {...props}
      value={inputValue}
      onChange={handleChange}
      onFocus={handleFocus}
<<<<<<< HEAD
=======
      onBlur={handleBlur}
      error={localError}
>>>>>>> 9097e19ed81b64e0788f0c94f5cf1ce56aecfc09
    />
  );
};
