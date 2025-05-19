import { allPasswordRequirementsCorrect } from "@/handlers/allPasswordRequirementsCorrect";
import { useCursorEffect } from "@/hooks/useCursorEffect";
import { useAppSelector } from "@/store/hooks";
import { GeneralInput as GeneralInputProps } from "@/types/GeneralInput";
import cn from "classnames";
import { ChangeEvent, FC, useRef, useState } from "react";
import styles from "./GeneralInput.module.scss";
import { PasswordRequirements } from "./components/PasswordRequirements";
import { ShowPasswordBtn } from "./components/ShowPasswordBtn";

export const GeneralInput: FC<GeneralInputProps> = ({
  type,
  title,
  placeholder,
  name,
  required,
  value,
  error,
  onChange,
  validate,
  onBlur,
  onFocus,
  showPasswordRequirements = false,
  disabled,
}) => {
  const { handleMouseEnter, handleMouseLeave } = useCursorEffect();
  const [isPasswordReqsDefault, setIsPasswordReqsDefault] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [localError, setLocalError] = useState("");
  const [keepPasswordRequirements, setKeepPasswordRequirements] =
    useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const { passwordRequirements } = useAppSelector(
    (state) => state.registration
  );

  const isPasswordField = type === "password";

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    onChange(name, value); // every component has its own func, it must update forms but also can add local errors

    if (validate) {
      const validationError = validate(value);
      setLocalError(validationError || "");
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    if (onBlur) {
      onBlur();
    }

    const relatedTarget = e.relatedTarget as HTMLElement | null;
    if (relatedTarget?.closest("[data-show-password-btn]")) return;

    setIsFocused(false);

    if (validate) {
      const validationError = validate(value);
      setLocalError(validationError || "");
    }

    if (
      name === "password1" ||
      (name === "new_password1" &&
        !allPasswordRequirementsCorrect(passwordRequirements) &&
        value.length)
    ) {
      setKeepPasswordRequirements(true);
    } else {
      setKeepPasswordRequirements(false);
    }
  };

  const handleFocus = () => {
    if (onFocus) {
      onFocus();
    }

    setIsFocused(true);
    if (isPasswordField && !value.length) {
      setIsPasswordReqsDefault(true);
    }
  };

  const getFieldStatus = () => {
    if (error || localError) {
      return "error";
    }
    if (value && !error && !localError) {
      return "success";
    }

    return undefined;
  };

  return (
    <label
      className={cn(styles["input-label"], styles["additional-text"])}
      htmlFor={name}
    >
      {title}
      {required && <span className={styles["input-label__star"]}>*</span>}

      <div className={styles["input-wrapper"]}>
        <input
          type={showPass ? "text" : type}
          ref={inputRef}
          className={cn(styles["input"], {
            [styles["input--error"]]: getFieldStatus() === "error",
            [styles["input--success"]]: getFieldStatus() === "success",
          })}
          value={value}
          placeholder={placeholder}
          onChange={handleChange}
          required={required}
          onBlur={handleBlur}
          onFocus={handleFocus}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          name={name}
          id={name}
          disabled={disabled}
        />

        {isPasswordField && value.length > 0 && (
          <div className={styles["input-show-pass-wrapper"]}>
            <ShowPasswordBtn setShowPass={setShowPass} inputRef={inputRef} />
          </div>
        )}
      </div>

      {(error || localError) && (
        <span className={styles["input-error"]}>{error || localError}</span>
      )}

      {((showPasswordRequirements && isPasswordField && isFocused) ||
        keepPasswordRequirements) && (
        <PasswordRequirements
          isPasswordReqsDefault={isPasswordReqsDefault}
          isBlured={!isFocused}
        />
      )}
    </label>
  );
};
