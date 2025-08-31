import { useCursorEffect } from "@/hooks";
import { FC } from "react";
import styles from "./ModalCancelBtn.module.scss";

type Props = {
  onClick: () => void;
};

export const ModalCancelBtn: FC<Props> = ({ onClick }) => {
  const { handleMouseEnter, handleMouseLeave } = useCursorEffect();

  const handleClick = () => {
    onClick();
    handleMouseLeave();
  }

  return (
    <button
      className={styles["cancel-btn"]}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
    />
  );
};
