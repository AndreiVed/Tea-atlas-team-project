import { useWindowSize } from "@uidotdev/usehooks";
import cn from "classnames";
import { FC, useEffect } from "react";
import { useSearchParams } from "react-router-dom";

import { screenEndpoints } from "@/constants/endpoints";
import { selectedFiltersDefaults, urlFiltersDefaults } from "@/constants/formsInitials";

import { filterActions } from "@/features/filter/filterSlice";
import { productsActions } from "@/features/products/productsSlice";
import { updateShowSearch } from "@/features/search/searchSlice";

import { useLoadSelectedProducts, useScroll } from "@/hooks";
import { useAppDispatch, useAppSelector } from "@/store/hooks";

import { Banner } from "@/components/Banner";
import { GeneralButton } from "@/components/GeneralButton";
import { Filter } from "./components/Filter";
import { Products } from "./components/Products";

import { SelectedFilters } from "@/types/SelectedFilters";
import styles from "./CatalogPage.module.scss";

export const CatalogPage: FC = () => {
  const {
    updateSelectedFilters,
    updateSubmittedFilters,
    updateIsFilterOpened,
  } = filterActions;

  const { updateCurrentPage, updateProductsPerPage } = productsActions;
  const [searchParams] = useSearchParams();
  const dispatch = useAppDispatch();
  const { width } = useWindowSize();
  const { loadSelectedProducts } = useLoadSelectedProducts();

  useScroll({ options: { top: 0, behavior: "instant" } });

  const { isFilterOpened } = useAppSelector((state) => state.filter);
  const { products, currentPage, productsPerPage } = useAppSelector(
    (state) => state.products
  );

  useEffect(() => {
    dispatch(updateIsFilterOpened(false));
  }, [dispatch]);

  useEffect(() => {
    const urlFilters = { ...urlFiltersDefaults };

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
      dispatch(updateShowSearch(false));
      sessionStorage.removeItem("page");
      dispatch(updateCurrentPage(1));
    };
  }, [dispatch, searchParams]);

  useEffect(() => {
    if (!width) {
      return;
    }

    const isDesktop = width >= screenEndpoints.desktop;
    const expectedProductsPerPage = isDesktop ? 9 : 8;

    if (productsPerPage !== expectedProductsPerPage) {
      dispatch(updateProductsPerPage(expectedProductsPerPage));
    }
  }, [width]);

  const handlePaginationClick = () => {
    dispatch(updateCurrentPage(currentPage + 1));
    sessionStorage.setItem("page", currentPage.toString());
  };

  const showLoadMoreBtn = products.length > currentPage * productsPerPage;

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
        <Products />
      </div>
      {showLoadMoreBtn ? (
        <div className={styles["catalog__load-more-btn"]}>
          <GeneralButton
            type="secondary"
            text="LOAD MORE"
            onClick={handlePaginationClick}
          />
        </div>
      ) : null}
    </div>
  );
};
