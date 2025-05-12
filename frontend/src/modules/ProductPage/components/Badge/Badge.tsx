import cn from "classnames";
import { FC } from "react";
import styles from "./Badge.module.scss";

type Props = {
  text: string;
};

export const Badge: FC<Props> = ({ text }) => {
  return (
    <div className={styles["badge"]}>
      <p className={cn(styles["badge__text"], "additional-text")}>{text}</p>
    </div>
  );
};
