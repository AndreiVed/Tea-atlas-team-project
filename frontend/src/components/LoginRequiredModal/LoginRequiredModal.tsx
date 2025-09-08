import { GeneralButton } from "@/components/GeneralButton";
import { ModalMessage } from "@/components/ModalMessage";
import { updateShowLoginRequiredModal } from "@/features/modal/modalSlice";
import { useAppDispatch } from "@/store/hooks";
import { FC } from "react";
import { ModalCancelBtn } from "../ModalCancelBtn";
import styles from "./LoginRequiredModal.module.scss";

export const LoginRequiredModal: FC = () => {
  const dispatch = useAppDispatch();

  return (
    <ModalMessage>
      <ModalCancelBtn
        onClick={() => dispatch(updateShowLoginRequiredModal(false))}
      />
      <h2 className={styles["modal__title"]}>This action requires login</h2>

      <p className={styles["modal__description"]}>Please log in to continue</p>
      <div className={styles["modal__buttons"]}>
        <GeneralButton
          type="primary"
          text="LOGIN"
          to="/login"
          onClick={() => dispatch(updateShowLoginRequiredModal(false))}
        />
        <GeneralButton
          type="secondary"
          text="CANCEL"
          onClick={() => dispatch(updateShowLoginRequiredModal(false))}
        />
      </div>
    </ModalMessage>
  );
};
