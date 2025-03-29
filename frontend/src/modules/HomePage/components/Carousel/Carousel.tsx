import { FC } from "react";
import { carouselCountries } from "../../../../constants/carousel";
import { CountryCart } from "../CountryCart";
import styles from "./Carousel.module.scss";


export const Carousel: FC = () => {
  return (
    <section className={styles["carousel"]}>
      {carouselCountries.map((country) => (
        <CountryCart key={country.id} country={country} />
      ))}
    </section>
  );
};
