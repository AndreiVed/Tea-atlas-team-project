import { FC } from "react";
import { useCursorEffect } from "../../../../hooks/useCursorEffect";
import { carouselCountry } from "../../../../types/CarouselCountry";
import styles from "./CountryCart.module.scss";

type Props = {
  country: carouselCountry;
};

export const CountryCart: FC<Props> = ({ country }) => {
  const { handleMouseEnter, handleMouseLeave } = useCursorEffect();
  const { title, photoPath } = country;

  return (
    <article
      className={styles["cart"]}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleMouseLeave}
    >
      <div className={styles["cart-photo-wrap"]}>
        <img
          className={styles["cart__photo"]}
          src={photoPath}
          alt="Country picture"
        />
      </div>
      <h3 className={styles["cart__title"]}>{title}</h3>
    </article>
  );
};
