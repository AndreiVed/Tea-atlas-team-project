import cn from "classnames";
import { Dispatch, FC, SetStateAction } from "react";
import { useCursorEffect } from "../../../../hooks/useCursorEffect";
import styles from "./ManageOption.module.scss";

type Props = {
  title: string;
  description: string;
  buttonText: string;
  setShowDeleteMsg: Dispatch<SetStateAction<boolean>>;
};

export const ManageOption: FC<Props> = ({
  title,
  description,
  buttonText,
  setShowDeleteMsg,
}) => {
  const { handleMouseEnter, handleMouseLeave } = useCursorEffect();

  return (
    <div className={styles["manage-option"]}>
      <div className={styles["manage-option__info"]}>
        <p className={cn(styles["manage-option__info-title"], "main-text")}>
          {title}
        </p>
        <p className={cn(styles["manage-option__info-desc"], "main-text")}>
          {description}
        </p>
      </div>
      <button
        className={styles["manage-option__delete"]}
        onClick={() => setShowDeleteMsg(true)}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {buttonText}
      </button>
    </div>
  );
};
