import cn from "classnames";
import { FC } from "react";
import { useNavigate } from "react-router-dom";
import { useCursorEffect } from "../../hooks/useCursorEffect";
import styles from "./Button.module.scss";

type Props = {
  type: "primary" | "secondary" | "text";
  isDanger?: boolean;
  text: string;
  icon?: string;
  to?: string;
};

export const Button: FC<Props> = ({ type, text, icon, isDanger, to }) => {
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
    >
      {icon ? <img src={icon} alt={text} /> : null}
      {text}
    </button>
  );
};
