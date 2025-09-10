import { Banner } from "@/components/Banner";
import { GeneralButton } from "@/components/GeneralButton/GeneralButton";
import { ProductCard } from "@/components/ProductCard";
import { useAppSelector } from "@/store/hooks";
import { FC } from "react";
import styles from "./LikedItPage.module.scss";

export const LikedItPage: FC = () => {
  const { likedProducts } = useAppSelector((state) => state.products);

  return (
    <section className={styles["liked-it"]}>
      <div className={styles["liked-it__banner"]}>
        <Banner
          className="liked-it__banner"
          baseSrc="/banners/likeditpage/liked-it-title.webp"
        />
        <h1 className={styles["liked-it__banner-title"]}>Liked it</h1>
      </div>
      <section className={styles["liked-it__content"]}>
        <div className={styles["liked-it__products"]}>
          {Array.isArray(likedProducts)
            ? likedProducts.map((product) => (
                <ProductCard
                  product={product}
                  key={product.id}
                  usedIn="liked-it"
                />
              ))
            : null}
        </div>
        <div className={styles["liked-it__complete-order"]}>
          <h3 className={styles["liked-it__complete-order-text"]}>
            Complete the list of your favorite teas
          </h3>
          <div className={styles["liked-it__complete-order-btn-wrap"]}>
            <GeneralButton type="primary" text="TEA CATALOG" to="/catalog" />
          </div>
        </div>
      </section>
    </section>
  );
};
