import { GeneralButton } from "@/components/GeneralButton";
import { useCursorEffect } from "@/hooks";
import { FC, useState } from "react";
import styles from './LoginModal.module.scss';

export const LoginModal: FC = () => {
  const { handleMouseEnter, handleMouseLeave } = useCursorEffect();
  const [, setShowDeleteMsg] = useState(false);

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
