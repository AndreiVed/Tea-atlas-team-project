import { FC } from "react";
import styles from "./ProductCart.module.scss";

export const ProductCart: FC = () => {
  return (
    <article className={styles["product"]}>
      <img
        className={styles["product__photo"]}
        src="/products/product-photo.jpg"
        alt="Product"
      />
      <div className={styles["product__info"]}>
        <h3 className={styles["product__info-title"]}>HeiCha</h3>
        <p className={styles["product__info-tea-type"]}>White tea</p>
        <div className={styles["product__info-categories"]}>
          <p className={styles["product__info-categories-category"]}>Sweet</p>
          <p className={styles["product__info-categories-category"]}>Creamy</p>
          <p className={styles["product__info-categories-category"]}>Spicy</p>
        </div>
      </div>
    </article>
  );
};
