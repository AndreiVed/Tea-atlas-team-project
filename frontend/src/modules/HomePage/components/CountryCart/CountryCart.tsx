import { useCursorEffect } from "@/hooks/useCursorEffect";
import { CarouselCountry } from "@/types/CarouselCountry";
import { FC } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./CountryCart.module.scss";

type Props = {
  country: CarouselCountry;
};

export const CountryCart: FC<Props> = ({ country }) => {
  const { handleMouseEnter, handleMouseLeave } = useCursorEffect();
  const { title, photoPath } = country;
  const navigate = useNavigate();

  const handleCartClick = () => {
    handleMouseLeave();
    navigate(`/catalog?country=${title.toLowerCase()}`);
  };

  return (
    <article
      className={styles["cart"]}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleCartClick}
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
