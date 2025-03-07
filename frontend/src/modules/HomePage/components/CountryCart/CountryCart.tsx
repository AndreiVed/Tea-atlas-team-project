import { FC } from "react";
import { carouselCountry } from "../../../../types/CarouselCountry";
import styles from "./CountryCart.module.scss";

type Props = {
  country: carouselCountry;
};

export const CountryCart: FC<Props> = ({ country }) => {
  const { title, photoPath } = country;

  return (
    <article className={styles["cart"]}>
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
