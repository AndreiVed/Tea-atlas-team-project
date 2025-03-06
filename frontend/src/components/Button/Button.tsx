import cn from "classnames";
import { FC } from "react";
import styles from "./Button.module.scss";

type Props = {
  type: "primary" | "secondary" | "text";
  text: string;
};

export const Button: FC<Props> = ({ type, text }) => {
  return (
    <button className={cn(styles["button"], styles[`button--${type}`])}>
      {text}
    </button>
  );
};
