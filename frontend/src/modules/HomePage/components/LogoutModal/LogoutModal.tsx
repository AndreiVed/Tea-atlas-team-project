import { GeneralButton } from "@/components/GeneralButton";
import { ModalCancelBtn } from "@/components/ModalCancelBtn";
import { ModalMessage } from "@/components/ModalMessage";
import { updateIsReauthRequired } from "@/features/profile/profileSlice";
import { useAppDispatch } from "@/store/hooks";
import { Dispatch, FC, SetStateAction } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./LogoutModal.module.scss";

type Props = {
  setShowReauth: Dispatch<SetStateAction<boolean>>;
};

export const LogoutModal: FC<Props> = ({ setShowReauth }) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleLoginBtnClick = () => {
    dispatch(updateIsReauthRequired(false));
    setShowReauth(false);
    navigate("/login", { replace: true });
  };

  const handleCancelClick = () => {
    setShowReauth(false);
    navigate("/", { replace: true });
  };

  return (
    <ModalMessage>
      <ModalCancelBtn onClick={handleCancelClick} />
      <h2 className={styles["logout-modal__title"]}>
        Unfortunately, your session has expired
      </h2>
      <h3 className={styles["logout-modal__subtitle"]}>
        Please, log in again to continue
      </h3>
      <div className={styles["logout-modal__buttons"]}>
        <GeneralButton
          type="primary"
          text="LOGIN"
          onClick={handleLoginBtnClick}
        />
        <GeneralButton
          type="secondary"
          text="CANCEL"
          onClick={handleCancelClick}
        />
      </div>
    </ModalMessage>
  );
};
