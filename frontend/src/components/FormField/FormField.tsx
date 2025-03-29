import cn from "classnames";
import { FC, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import styles from "./FormField.module.scss";

type Props = {
  type: "text" | "email";
  title: string;
  placeholder: string;
  required?: boolean;
};

export const FormField: FC<Props> = ({
  type,
  title,
  placeholder,
  required,
}) => {
  const isRequired = required ? required : false;
  // const [value, setValue] = useState("");
  const { pathname } = useLocation();

  const [usedIn, setUsedIn] = useState("");

  useEffect(() => {
    setUsedIn(pathname);
  }, [setUsedIn, pathname]);

  useEffect(() => {}, [usedIn]);

  return (
    <label
      className={cn(styles["input-label"], styles["additional-text"])}
      htmlFor=""
    >
      {title}
      {required ? <span className={styles["input-label__star"]}>*</span> : null}
      <input
        type={type}
        className={styles["input"]}
        placeholder={placeholder}
        required={isRequired}
      />
    </label>
  );
};
