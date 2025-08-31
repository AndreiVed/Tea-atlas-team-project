import { GeneralButton } from "@/components/GeneralButton/GeneralButton";
import { ModalCancelBtn } from "@/components/ModalCancelBtn";
import { ModalMessage } from "@/components/ModalMessage";
import { Dispatch, FC, SetStateAction } from "react";
import styles from "./DeleteAccount.module.scss";

type Props = {
  setShowDeleteMsg: Dispatch<SetStateAction<boolean>>;
};

export const DeleteAccount: FC<Props> = ({ setShowDeleteMsg }) => {

  return (
    <ModalMessage>
      <div className={styles["delete-account__header"]}>
        <img
          className={styles["delete-account__danger-icon"]}
          src="/icons/triangle-danger.svg"
          alt="Danger!"
        />
        <ModalCancelBtn onClick={() => setShowDeleteMsg(false)}/>
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
    </ModalMessage>
  );
};
