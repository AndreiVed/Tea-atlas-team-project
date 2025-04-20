import { Dispatch, FC, SetStateAction } from "react";
import { useNavigate } from "react-router-dom";
import { GeneralButton } from "../../../../components/GeneralButton/GeneralButton";
import { userInfoInitials } from "../../../../constants/user";
import {
  updateIsLoggedIn,
  updateUserInfo,
} from "../../../../features/profile/profileSlice";
import { useCursorEffect } from "../../../../hooks/useCursorEffect";
import { useAppDispatch } from "../../../../store/hooks";
import styles from "./DeleteAccount.module.scss";

type Props = {
  setShowDeleteMsg: Dispatch<SetStateAction<boolean>>;
};

export const DeleteAccount: FC<Props> = ({ setShowDeleteMsg }) => {
  const { handleMouseEnter, handleMouseLeave } = useCursorEffect();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  // should add fetch
  const handleAccountDeletion = () => {
    dispatch(updateIsLoggedIn(false));
    dispatch(updateUserInfo(userInfoInitials));
    navigate('/');
  };

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
          <GeneralButton type="secondary" text="CANCEL" />
        </div>
        <div
          className={styles["delete-account__buttons-delete-wrap"]}
          onClick={handleAccountDeletion}
        >
          <GeneralButton type="primary" text="DELETE" isDanger />
        </div>
      </div>
    </section>
  );
};
