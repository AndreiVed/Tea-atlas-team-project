import { Button } from "../../components/Button/Button";
import { desktopWidth, tabletWidth } from "../../config";
import { Carousel } from "./components/Carousel";
import styles from "./HomePage.module.scss";

export const HomePage = () => {
  return (
    <>
      <section className={styles["discover-world-of-tea"]}>
        <div className={styles["discover-world-of-tea__banner"]}>
          <picture>
            <source
              srcSet="./banners/teapot-with-tea-bright-table-desktop.jpg"
              media={`min-width: ${desktopWidth}px`}
            />
            <source
              srcSet="./banners/teapot-with-tea-bright-table-tablet.jpg"
              media={`min-width: ${tabletWidth}px`}
            />
            <img
              className={styles["discover-world-of-tea__mobile-banner"]}
              src="./banners/teapot-with-tea-bright-table-mobile.jpg"
              alt="Discover world of tea banner"
            />
          </picture>
        </div>
        <div className={styles["discover-world-of-tea__wrap"]}>
          <h2 className={styles["discover-world-of-tea__title"]}>
            Discover the <br />
            world of Tea
          </h2>
          <Button type="secondary" text="tea catalog" />
        </div>
      </section>
      <section className={styles["tea-catalog"]}>
        <div className={styles["tea-catalog__banner"]}>
          <picture>
            <source srcSet="" media={`min-width: ${desktopWidth}px`} />
            <source srcSet="" media={`min-width: ${tabletWidth}px`} />
            <img
              className={styles["tea-catalog__banner-mobile"]}
              src="./banners/homepage-tea-catalog-banner-mobile.jpg"
              alt="Tea catalog"
            />
          </picture>
        </div>
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
        <div className={styles["guide__banner"]}>
          <picture>
            <source
              srcSet="./banners/homepage-brewing-desktop.jpg"
              media={`min-width: ${desktopWidth}px`}
            />
            <source
              srcSet="./banners/homepage-brewing-tablet.jpg"
              media={`min-width: ${tabletWidth}px`}
            />
            <img
              className={styles["guide__banner-mobile"]}
              src="./banners/homepage-brewing-mobile.jpg"
              alt="Tea catalog"
            />
          </picture>
        </div>
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
