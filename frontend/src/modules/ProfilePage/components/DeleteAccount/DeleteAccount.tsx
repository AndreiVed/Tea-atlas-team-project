import { Dispatch, FC, SetStateAction } from "react";
import { GeneralButton } from "../../../../components/GeneralButton/GeneralButton";
import { useCursorEffect } from "../../../../hooks/useCursorEffect";
import styles from "./DeleteAccount.module.scss";

type Props = {
  setShowDeleteMsg: Dispatch<SetStateAction<boolean>>;
};

export const DeleteAccount: FC<Props> = ({ setShowDeleteMsg }) => {
  const { handleMouseEnter, handleMouseLeave } = useCursorEffect();

  return (
    <section className={styles["delete-account"]}>
      <div className={styles["delete-account__header"]}>
        <img
          className={styles["delete-account__danger-icon"]}
          src="/icons/triangle-danger.svg"
          alt="Danger!"
        />
        <button
          className={styles["delete-account__close-btn"]}
          onClick={() => {
            setShowDeleteMsg(false);
            handleMouseLeave();
          }}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        />
      </div>
      <div className={styles["delete-account__info"]}>
        <h3 className={styles["delete-account__info-title"]}>
          This feature is currently unavailable
        </h3>
        <p className={styles["delete-account__info-desc"]}>
          We're working on making it available soon. Thank you for your
          patience!
        </p>
      </div>
      <div
        className={styles["delete-account__back-to-account"]}
        onClick={() => setShowDeleteMsg(false)}
      >
        <GeneralButton type="secondary" text="BACK TO ACCOUNT" />
      </div>
    </section>
  );
};
