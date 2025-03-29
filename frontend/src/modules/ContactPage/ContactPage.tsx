import cn from "classnames";
import { FC } from "react";
import { Banner } from "../../components/Banner";
import { Button } from "../../components/Button/Button";
import { FormField } from "../../components/FormField";
import { useScroll } from "../../hooks/useScroll";
import styles from "./ContactPage.module.scss";
import { Description } from "./components/Description";

export const ContactPage: FC = () => {
  useScroll({ options: { top: 0, behavior: "instant" } });

  return (
    <section className={styles["contact-us"]}>
      <div className={styles["contact-us__top"]}>
        <Banner
          className="contact-us__banner"
          baseSrc="/banners/contactpage/contact.jpg"
        />
        <div className={styles["contact-us__top-info-wrap"]}>
          <h1 className={styles["contact-us__top-title"]}>Contact us</h1>
          <div className={styles["contact-us__top-description-wrap"]}>
            <Description />
          </div>
        </div>
      </div>
      <div className={styles["contact-us__main"]}>
        <div className={styles["contact-us__main-description-wrap"]}>
          <Description />
        </div>
        <form
          className={cn(styles["contact-us__main-form"], styles["form"])}
          action=""
        >
          <div className={styles["form__inputs"]}>
            <FormField
              title="Name"
              placeholder="John Doe"
              type="text"
              required
            />
            <FormField
              title="Phone Number"
              placeholder="+1 234 567 8900"
              type="text"
            />
            <FormField
              title="Email"
              placeholder="name@example.com"
              type="email"
              required
            />
            <FormField
              title="Message"
              placeholder="Write your message here..."
              type="text"
              required
            />
          </div>
          <div className={styles["form__submit-btn-wrap"]}>
            <Button type="primary" text="send message" />
          </div>
        </form>
      </div>
    </section>
  );
};
