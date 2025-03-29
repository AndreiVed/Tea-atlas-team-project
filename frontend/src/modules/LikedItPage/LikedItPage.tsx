import { FC } from "react";
import { Banner } from "../../components/Banner";
import { Button } from "../../components/Button/Button";
import { ProductCart } from "../../components/ProductCart";
import styles from "./LikedItPage.module.scss";

export const LikedItPage: FC = () => {
  return (
    <section className={styles["liked-it"]}>
      <div className={styles["liked-it__banner"]}>
        <Banner
          className="liked-it__banner"
          baseSrc="/banners/likeditpage/liked-it-title.jpg"
        />
        <h1 className={styles["liked-it__banner-title"]}>Liked it</h1>
      </div>
      <div className={styles["liked-it__products"]}>
        {Array.from({ length: 8 }).map(() => (
          <ProductCart key={Math.random()} />
        ))}
      </div>
      <div className={styles["liked-it__complete-order"]}>
        <h3 className={styles["liked-it__complete-order-text"]}>
          Complete the list of your favorite teas
        </h3>
        <div className={styles["liked-it__complete-order-btn-wrap"]}>
          <Button type="primary" text="tea catalog" to="/catalog" />
        </div>
      </div>
    </section>
  );
};
