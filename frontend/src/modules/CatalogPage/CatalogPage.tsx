import cn from "classnames";
import { FC } from "react";
import { Banner } from "../../components/Banner";
import { useScroll } from "../../hooks/useScroll";
import { useAppSelector } from "../../store/hooks";
import styles from "./CatalogPage.module.scss";
import { Filter } from "./components/Filter";
import { ProductCart } from "./components/ProductCart";
// import { Products } from "./components/Products";

export const CatalogPage: FC = () => {
  const isFilterOpened = useAppSelector((state) => state.filter.isFilterOpened);

  useScroll({ options: { top: 0, behavior: "instant" } });

  return (
    <div
      className={cn(styles["catalog"], {
        [styles["catalog--disabled"]]: isFilterOpened,
      })}
    >
      <div className={styles["catalog-banner-wrap"]}>
        <Banner
          className="catalog__banner"
          baseSrc="/banners/catalogpage/catalog.jpg"
        />
        <h2 className={styles["catalog__title"]}>Tea Catalog</h2>
      </div>
      <div className={styles["catalog-wrap"]}>
        <Filter />
        {Array.from({ length: 24 }).map(() => (
          <ProductCart key={Math.random()} />
        ))}
        {/* <Products /> */}
      </div>
    </div>
  );
};
