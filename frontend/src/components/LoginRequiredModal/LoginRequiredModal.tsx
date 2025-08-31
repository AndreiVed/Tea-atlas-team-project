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
      <h2 className={styles["modal-title"]}>This action requires login</h2>

      <p className={styles["modal-description"]}>Please log in to continue</p>
      <GeneralButton
        type="primary"
        text="LOGIN"
        to="/login"
        onClick={() => dispatch(updateShowLoginRequiredModal(false))}
      />
    </ModalMessage>
  );
};
