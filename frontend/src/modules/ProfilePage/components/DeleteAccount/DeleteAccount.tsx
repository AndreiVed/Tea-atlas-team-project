import { Dispatch, FC, SetStateAction } from "react";
import { Button } from "../../../../components/Button/Button";
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
        <h3 className={styles["delete-account__info-title"]}>Delete Account</h3>
        <p className={styles["delete-account__info-desc"]}>
          Are you sure you want to delete your account? This action is
          irreversible, and all your data will be permanently lost
        </p>
      </div>
      <div className={styles["delete-account__buttons"]}>
        <div
          className={styles["delete-account__buttons-cancel-wrap"]}
          onClick={() => setShowDeleteMsg(false)}
        >
          <Button type="secondary" text="cancel" />
        </div>
        <Button type="primary" text="delete" isDanger />
      </div>
    </section>
  );
};
