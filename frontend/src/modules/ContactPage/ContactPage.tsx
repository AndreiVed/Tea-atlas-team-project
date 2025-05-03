// import cn from "classnames";
// import { FC } from "react";
// import { Banner } from "../../components/Banner";
// import { GeneralButton } from "../../components/GeneralButton/GeneralButton";
// import { GeneralInput } from "../../components/GeneralInput";
// import { useScroll } from "../../hooks/useScroll";
// import styles from "./ContactPage.module.scss";
// import { Description } from "./components/Description";

// export const ContactPage: FC = () => {
//   useScroll({ options: { top: 0, behavior: "instant" } });

//   return (
//     <section className={styles["contact-us"]}>
//       <div className={styles["contact-us__top"]}>
//         <Banner
//           className="contact-us__banner"
//           baseSrc="/banners/contactpage/contact.jpg"
//         />
//         <div className={styles["contact-us__top-info-wrap"]}>
//           <h1 className={styles["contact-us__top-title"]}>Contact us</h1>
//           <div className={styles["contact-us__top-description-wrap"]}>
//             <Description />
//           </div>
//         </div>
//       </div>
//       <div className={styles["contact-us__main"]}>
//         <div className={styles["contact-us__main-description-wrap"]}>
//           <Description />
//         </div>
//         <form
//           className={cn(styles["contact-us__main-form"], styles["form"])}
//           action=""
//         >
//           <div className={styles["form__inputs"]}>
//             <GeneralInput
//               title="Name"
//               placeholder="John Doe"
//               type="text"
//               required
//             />
//             <GeneralInput
//               title="Phone Number"
//               placeholder="+1 234 567 8900"
//               type="text"
//             />
//             <GeneralInput
//               title="Email"
//               placeholder="name@example.com"
//               type="email"
//               required
//             />
//             <GeneralInput
//               title="Message"
//               placeholder="Write your message here..."
//               type="text"
//               required
//             />
//           </div>
//           <div className={styles["form__submit-btn-wrap"]}>
//             <GeneralButton type="primary" text="SEND MESSAGE" />
//           </div>
//         </form>
//       </div>
//     </section>
//   );
// };
