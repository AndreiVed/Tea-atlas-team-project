import { Button } from "../../components/Button/Button";
import { Banner } from "./components/Banner";
import { Carousel } from "./components/Carousel";
import styles from "./HomePage.module.scss";

export const HomePage = () => {
  return (
    <>
      <section className={styles["discover-world-of-tea"]}>
        <Banner
          className="discover-world-of-tea__banner"
          baseSrc="/banners/homepage/teapot-with-tea-bright-table.jpg"
        />
        <div className={styles["discover-world-of-tea__wrap"]}>
          <h2 className={styles["discover-world-of-tea__title"]}>
            Discover the <br />
            world of Tea
          </h2>
          <Button type="secondary" text="tea catalog" />
        </div>
      </section>
      <section className={styles["tea-catalog"]}>
        <Banner
          className="tea-catalog__banner"
          baseSrc="/banners/homepage/tea-catalog-banner.jpg"
        />
        <div className={styles["tea-catalog__info"]}>
          <h3 className={styles["tea-catalog__info-title"]}>Tea Catalog</h3>
          <p className={styles["tea-catalog__info-description"]}>
            Browse our selection of teas from different regions, each with its
            unique flavor profile and history. Use filters to find the perfect
            tea for your taste
          </p>
          <Button type="secondary" text="tea catalog" />
        </div>
      </section>
      <section className={styles["carousel"]}>
        <h3 className={styles["carousel__title"]}>Tea by Country</h3>
        <Carousel />
      </section>

      <section className={styles["guide"]}>
        <Banner
          className="guide__banner"
          baseSrc="/banners/homepage/brewing.jpg"
        />
        <div className={styles["guide__info"]}>
          <h3 className={styles["guide__info-title"]}>Brewing Guide</h3>
          <p className={styles["guide__info-description"]}>
            Learn the art of tea brewing with expert tips and step-by-step
            instructions to unlock the full aroma and taste of your favorite
            teas
          </p>
          <Button type="secondary" text="brewing guide" />
        </div>
      </section>

      <section className={styles["blog"]}>
        <h3 className={styles["blog__title"]}>Tea Culture & Stories</h3>
        <p className={styles["blog__description"]}>
          Browse our selection of teas from different regions, each with its
          unique flavor profile and history. Use filters to find the perfect tea
          for your taste
        </p>
        <Button type="secondary" text="blog" />
      </section>
    </>
  );
};
