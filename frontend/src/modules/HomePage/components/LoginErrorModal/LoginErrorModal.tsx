import { GeneralButton } from "@/components/GeneralButton";
import { ModalCancelBtn } from "@/components/ModalCancelBtn";
import { ModalMessage } from "@/components/ModalMessage";
import { Dispatch, FC, SetStateAction } from "react";
import styles from "./LoginErrorModal.module.scss";

type Props = {
  setIsLoginError: Dispatch<SetStateAction<boolean>>;
};

export const LoginErrorModal: FC<Props> = ({ setIsLoginError }) => {
  return (
    <ModalMessage>
      <ModalCancelBtn onClick={() => setIsLoginError(false)} />
      <h3 className={styles["error-modal__title"]}>
        Something went wrong with login
      </h3>
      <p className={styles["error-modal__description"]}>Please, try again</p>
      <div className={styles["error-modal__buttons"]}>
        <GeneralButton type="primary" text="LOGIN" to="/login" />
        <GeneralButton
          type="secondary"
          text="CANCEL"
          onClick={() => setIsLoginError(false)}
        />
      </div>
    </ModalMessage>
  );
};
