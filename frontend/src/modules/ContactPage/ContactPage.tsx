import cn from "classnames";
import { FC, FormEvent, useEffect } from "react";
import { Banner } from "../../components/Banner";
import { GeneralButton } from "../../components/GeneralButton/GeneralButton";
import { contactFormDefaults } from "../../constants/formsInitials";
import { updateContactForm } from "../../features/contact/contactSlice";
import { useScroll } from "../../hooks/useScroll";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import styles from "./ContactPage.module.scss";
import { ContactInput } from "./components/ContactInput";
import { Description } from "./components/Description";

export const ContactPage: FC = () => {
  useScroll({ options: { top: 0, behavior: "instant" } });
  const { contactForm } = useAppSelector((state) => state.contact);
  const { name, email, phone, message } = contactForm;
  const dispatch = useAppDispatch();

  useEffect(() => {
    console.log(contactForm);
  }, [contactForm]);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(updateContactForm(contactFormDefaults));
  }

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
          onSubmit={handleSubmit}
        >
          <div className={styles["form__inputs"]}>
            <ContactInput
              title="Name"
              placeholder="John Doe"
              type="text"
              name="name"
              value={name}
              required
            />
            <ContactInput
              title="Phone Number"
              placeholder="+1 234 567 8900"
              type="text"
              name="phone"
              value={phone}
            />
            <ContactInput
              title="Email"
              placeholder="name@example.com"
              type="email"
              name="email"
              value={email}
              required
            />
            <ContactInput
              title="Message"
              placeholder="Write your message here..."
              type="text"
              name="message"
              value={message}
              required
            />
          </div>
          <div className={styles["form__submit-btn-wrap"]}>
            <GeneralButton type="primary" text="SEND MESSAGE" isSubmit />
          </div>
        </form>
      </div>
    </section>
  );
};
