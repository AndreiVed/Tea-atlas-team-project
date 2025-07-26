import { Dispatch, FC, SetStateAction } from "react";
import styles from "./LoginErrorModal.module.scss";

type Props = {
  setIsLoginError: Dispatch<SetStateAction<boolean>>;
};

export const LoginErrorModal: FC<Props> = ({ setIsLoginError }) => {
  return (
    <div className={styles["error-modal"]}>
      <button
        className={styles["error-modal__cancel"]}
        onClick={() => setIsLoginError(false)}
      />
      <h3 className={styles["error-modal__title"]}>
        Something went wrong with login
      </h3>
      <p className={styles["error-modal__description"]}>Please, try again</p>
    </div>
  );
};
