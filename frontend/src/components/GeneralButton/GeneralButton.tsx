import cn from "classnames";
import { FC } from "react";
import { useNavigate } from "react-router-dom";
import { useCursorEffect } from "../../hooks/useCursorEffect";
import { Loader } from "../Loader";
import styles from "./GeneralButton.module.scss";

type Props = {
  type: "primary" | "secondary" | "text";
  isDanger?: boolean;
  text: string;
  icon?: string;
  to?: string;
  isSubmit?: boolean;
  isLoading?: boolean;
  isDisabled?: boolean;
};

export const GeneralButton: FC<Props> = ({
  type,
  text,
  icon,
  isDanger,
  to,
  isSubmit,
  isLoading,
  isDisabled,
}) => {
  const navigate = useNavigate();
  const { handleMouseEnter, handleMouseLeave } = useCursorEffect();

  const handleBtnClick = () => {
    if (to) {
      navigate(to);
    }

    handleMouseLeave();
  };

  return (
    <button
      className={cn(styles["button"], styles[`button--${type}`], {
        [styles["button--danger"]]: isDanger,
      })}
      onClick={handleBtnClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      type={isSubmit ? "submit" : "button"}
      disabled={isDisabled}
    >
      {icon ? <img src={icon} alt={text} /> : null}
      {isLoading ? <Loader /> : text}
    </button>
  );
};
