import cn from "classnames";
import { FC, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Banner } from "../../components/Banner";
import { GeneralButton } from "../../components/GeneralButton/GeneralButton";
import { selectedFiltersDefaults } from "../../constants/formsInitials";
import {
  updateIsFilterOpened,
  updateSelectedFilters,
  updateSubmittedFilters,
} from "../../features/filter/filterSlice";
import { useLoadSelectedProducts } from "../../hooks/useLoadSelectedProducts";
import { useScroll } from "../../hooks/useScroll";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { SelectedFilters } from "../../types/SelectedFilters";
import styles from "./CatalogPage.module.scss";
import { Filter } from "./components/Filter";
import { Products } from "./components/Products";

export const CatalogPage: FC = () => {
  const [searchParams] = useSearchParams();
  const dispatch = useAppDispatch();
  const { isFilterOpened } = useAppSelector((state) => state.filter);
  const { products } = useAppSelector((state) => state.products);
  const productsPerPage = 20;
  const { loadSelectedProducts } = useLoadSelectedProducts();

  useScroll({ options: { top: 0, behavior: "instant" } });

  useEffect(() => {
    const urlFilters: SelectedFilters = {
      country: [],
      impact: [],
      fermentation: [],
      type: [],
    };

    searchParams.forEach((value, key) => {
      if (Object.keys(urlFilters).includes(key)) {
        urlFilters[key as keyof SelectedFilters] = value.split(",");
      }
    });

    loadSelectedProducts(urlFilters);
    dispatch(updateSubmittedFilters(urlFilters));
    dispatch(updateSelectedFilters(urlFilters));

    return () => {
      dispatch(updateSelectedFilters(selectedFiltersDefaults));
      dispatch(updateSubmittedFilters(selectedFiltersDefaults));
    };
  }, [dispatch]);

  useEffect(() => {
    dispatch(updateIsFilterOpened(false));
  }, [dispatch]);

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
        <div
          className={cn(styles["catalog__products"], {
            [styles["catalog__products--empty"]]: !products.length,
          })}
        >
          <Products />
        </div>
      </div>
      {products.length > productsPerPage ? (
        <div className={styles["catalog__load-more-btn"]}>
          <GeneralButton type="secondary" text="LOAD MORE" />
        </div>
      ) : null}
    </div>
  );
};
