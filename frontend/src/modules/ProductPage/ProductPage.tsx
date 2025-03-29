import cn from "classnames";
import { FC } from "react";
import { useNavigate } from "react-router-dom";
import { Banner } from "../../components/Banner";
import { ProductCart } from "../../components/ProductCart";
import { useCursorEffect } from "../../hooks/useCursorEffect";
import { useScroll } from "../../hooks/useScroll";
import styles from "./ProductPage.module.scss";
import { ProductCharacteristics } from "./components/ProductCharacteristics";
import { SteepingInstructions } from "./components/SteepingInstructions";

export const ProductPage: FC = () => {
  const navigate = useNavigate();
  const { handleMouseEnter, handleMouseLeave } = useCursorEffect();
  const isAddedToFavorites = true;
  useScroll({ options: { top: 0, behavior: "instant" } });

  return (
    <section className={styles["product"]}>
      <div className={styles["product__top-info-wrap"]}>
        <img
          className={styles["product__photo"]}
          src="/products/product.jpg"
          alt="Product photo"
        />
        <div className={styles["product__characteristics-wrap"]}>
          <div className={styles["product__top"]}>
            <h2 className={styles["product__title"]}>LuCha</h2>
            <button
              className={cn(styles["product__add-to-fav"], {
                [styles["product__add-to-fav--filled"]]: isAddedToFavorites,
              })}
            />
          </div>
          <h3 className={styles["product__tea-type"]}>Green Tea</h3>
          <div className={styles["product__chars-wrap"]}>
            <ProductCharacteristics />
            <SteepingInstructions />
          </div>
        </div>
        <div className={styles["product__about"]}>
          <h3 className={styles["product__about-title"]}>About the product</h3>
          <p className={styles["product__about-desc"]}>
            Red tea from big old tea trees (Gu Shu), dried in the sun (kit.
            晒红乔木古树). The tea is harvested from trees about 150 years old
            in a high-altitude tea garden on the slope of Mount Jinoshan. The
            developed root system of old trees makes the leaves richer in trace
            elements, and the high-altitude collection area is characterized by
            ecological purity and a climate favorale for tea cultivation
          </p>
        </div>
      </div>

      <div className={styles["product__you-may-like"]}>
        <div className={styles["product__you-may-like-top"]}>
          <h4 className={styles["product__you-may-like-title"]}>
            You may also like
          </h4>
          <button
            className={cn(
              styles["product__you-may-like-view-btn"],
              "link-button"
            )}
          >
            view all
          </button>
        </div>
        <div className={styles["product__recommended-products"]}>
          {Array.from({ length: 4 }).map(() => (
            <ProductCart key={Math.random()} />
          ))}
        </div>
      </div>

      <div className={styles["product__learn-more"]}>
        <Banner
          baseSrc="/banners/productpage/learn-more.jpg"
          className="product__learn-more-banner"
        />
        <h4
          className={styles["product__learn-more-text"]}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onClick={() => {
            navigate("/blog/tea-brewing-essentials");
            handleMouseLeave();
          }}
        >
          Learn more about brewing tea
        </h4>
      </div>
    </section>
  );
};
