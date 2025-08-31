import { FC, ReactNode } from "react";
import styles from "./ModalMessage.module.scss";

type Props = {
  children?: ReactNode;
};

export const ModalMessage: FC<Props> = ({ children }) => {
  return (
    <div className={styles["modal__backdrop"]}>
      <div className={styles["modal"]}>{children}</div>
    </div>
  );
};
