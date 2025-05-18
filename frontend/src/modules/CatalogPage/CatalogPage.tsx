import { useWindowSize } from "@uidotdev/usehooks";
import cn from "classnames";
import { FC, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Banner } from "../../components/Banner";
import { GeneralButton } from "../../components/GeneralButton/GeneralButton";
import { screenEndpoints } from "../../constants/endpoints";
import { selectedFiltersDefaults } from "../../constants/formsInitials";
import {
  updateIsFilterOpened,
  updateSelectedFilters,
  updateSubmittedFilters,
} from "../../features/filter/filterSlice";
import { updateCurrentPage, updateProductsPerPage } from "../../features/products/productsSlice";
import { updateShowSearch } from "../../features/search/searchSlice";
import { useLoadSelectedProducts, useScroll } from "../../hooks";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { SelectedFilters } from "../../types/SelectedFilters";
import styles from "./CatalogPage.module.scss";
import { Filter } from "./components/Filter";
import { Products } from "./components/Products";

export const CatalogPage: FC = () => {
  const [searchParams] = useSearchParams();
  const dispatch = useAppDispatch();
  const { isFilterOpened } = useAppSelector((state) => state.filter);
  const { products, currentPage, productsPerPage } = useAppSelector((state) => state.products);
  const { loadSelectedProducts } = useLoadSelectedProducts();
  const { width } = useWindowSize();

  useScroll({ options: { top: 0, behavior: "instant" }});

  useEffect(() => {
    const urlFilters: SelectedFilters & { name: string } = {
      country: [],
      impact: [],
      fermentation: [],
      type: [],
      name: "",
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
      dispatch(updateShowSearch(false));
      sessionStorage.removeItem("page");
      dispatch(updateCurrentPage(1));
    };
  }, [dispatch, searchParams]);

  useEffect(() => {
    dispatch(updateIsFilterOpened(false));
  }, [dispatch]);

  useEffect(() => {
    if (width && width >= screenEndpoints.desktop && productsPerPage === 8 ) {
      dispatch(updateProductsPerPage(9));
      return;
    }

    if (width && width <= screenEndpoints.desktop && productsPerPage === 9) {
      dispatch(updateProductsPerPage(8));
      return;
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
