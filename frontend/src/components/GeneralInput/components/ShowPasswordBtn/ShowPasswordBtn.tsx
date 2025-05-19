import { useCursorEffect } from "@/hooks/useCursorEffect";
import cn from "classnames";
import { Dispatch, FC, RefObject, SetStateAction, useState } from "react";
import styles from "./ShowPasswordBtn.module.scss";

type Props = {
  setShowPass: Dispatch<SetStateAction<boolean>>;
  inputRef: RefObject<HTMLInputElement | null>;
};

export const ShowPasswordBtn: FC<Props> = ({ setShowPass, inputRef }) => {
  const { handleMouseEnter, handleMouseLeave } = useCursorEffect();
  const [isActive, setIsActive] = useState(false);

  const handleClick = () => {
    const input = inputRef.current;

    if (!input) {
      return;
    }

    const { selectionStart, selectionEnd } = input;

    setIsActive((prev) => !prev);
    setShowPass((prev) => !prev);

    setTimeout(() => {
      input.focus();
      input.setSelectionRange(selectionStart, selectionEnd);
    }, 0);
  };

  return (
    <button
      type="button"
      className={cn(styles["input-show-password-btn"], {
        [styles["input-show-password-btn--active"]]: isActive,
      })}
      data-show-password-btn
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
    />
  );
};
