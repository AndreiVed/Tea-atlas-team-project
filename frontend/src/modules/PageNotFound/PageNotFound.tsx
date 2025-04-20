import cn from "classnames";
import { FC } from "react";
import { Banner } from "../../components/Banner";
import { GeneralButton } from "../../components/GeneralButton/GeneralButton";
import styles from "./PageNotFound.module.scss";

export const PageNotFound: FC = () => {
  const bannerClassName = "page-not-found__banner";

  return (
    <div className={styles["page-not-found"]}>
      <div className={styles[bannerClassName]}>
        <Banner
          baseSrc="/banners/notfoundpage/404.jpg"
          className={bannerClassName}
        />
      </div>
      <div className={styles["page-not-found__info"]}>
        <h1 className={styles["page-not-found__title"]}>OOPS!</h1>
        <h2 className={styles["page-not-found__subtitle"]}>
          This page is not found
        </h2>
        <p className={cn(styles["page-not-found__desc"], "main-text")}>
          It may have been moved or no longer exists. But don’t worry — our tea
          catalog is always here for you
        </p>
        <div className={styles["page-not-found__cta-btn"]}>
          <GeneralButton type="primary" text="TEA CATALOG" to="/catalog" />
        </div>
      </div>
    </div>
  );
};
