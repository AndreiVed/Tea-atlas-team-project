import { FC } from "react";
import { CountryCart } from "../CountryCart";
import styles from "./Carousel.module.scss";
import { carouselCountries } from "./config";

export const Carousel: FC = () => {
  return (
    <section className={styles["carousel"]}>
      {carouselCountries.map((country) => (
        <CountryCart key={country.id} country={country} />
      ))}
    </section>
  );
};
