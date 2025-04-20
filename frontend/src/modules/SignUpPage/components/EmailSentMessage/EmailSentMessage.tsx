import cn from "classnames";
import { FC, useEffect } from "react";
import { Banner } from "../../../../components/Banner";
import { useAppSelector } from "../../../../store/hooks";
import { GoBackButton } from "../GoBackButton";
import styles from "./EmailSentMessage.module.scss";

export const EmailSentMessage: FC = () => {
  const { confirmationEmail } = useAppSelector((state) => state.registration);

  useEffect(() => {
    if (confirmationEmail) {
      localStorage.setItem("confirmationEmail", confirmationEmail);
    }
  }, [confirmationEmail]);

  return (
    <section className={styles["email-sent"]}>
      <GoBackButton to="/sign-up" cnModifier="on-confirmation" />
      <div className={styles["email-sent__info"]}>
        <div className={styles["email-sent__banner"]}>
          <Banner
            baseSrc="/banners/registrationpage/email-sent.jpg"
            className="email-sent"
          />
        </div>
        <h2 className={styles["email-sent__title"]}>Confirmation email sent</h2>
        <div className={styles["email-sent__instructions"]}>
          <p className={cn(styles["email-sent__confirmation"], "main-text")}>
            We've sent you an email with a confirmation link to{" "}
            <span className={styles["email-sent__user-email"]}>
              {confirmationEmail}
            </span>
          </p>
          <p className={cn(styles["email-sent__check-inbox"], "main-text")}>
            Please check your inbox and follow the link to continue.
          </p>
          <p
            className={cn(styles["email-sent__havent-received"], "small-text")}
          >
            If you haven't received the email, check your spam folder or request
            a new one
          </p>
        </div>
      </div>
    </section>
  );
};
