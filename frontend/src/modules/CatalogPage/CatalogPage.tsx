import cn from "classnames";
import { FC, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Banner } from "../../components/Banner";
import { Button } from "../../components/Button/Button";
import { ProductCart } from "../../components/ProductCart";
import { BASE_URL } from "../../config";
import { setSearchParams as reduxSetSearchParams, setIsFilterOpened } from "../../features/filter/filterSlice";
import { setError, setProducts } from "../../features/products/productsSlice";
import { useScroll } from "../../hooks/useScroll";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import styles from "./CatalogPage.module.scss";
import { Filter } from "./components/Filter";

export const CatalogPage: FC = () => {
  const [searchParams] = useSearchParams();
  // const reduxSearchParams = useAppSelector(
  //   (state) => state.filter.searchParams
  // );
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(reduxSetSearchParams(searchParams.toString()));
  }, [searchParams, dispatch]);

  // useEffect(() => {
  //   setSearchParams(reduxSearchParams);
  // }, [reduxSearchParams, setSearchParams]);

  const isFilterOpened = useAppSelector((state) => state.filter.isFilterOpened);

  useScroll({ options: { top: 0, behavior: "instant" } });

  useEffect(() => {
    const controller = new AbortController();
    const CATALOG_URL = BASE_URL + "/api/v1/catalog";

    fetch(CATALOG_URL)
      .then((response) => {
        if (!response.ok) {
          dispatch(setError(response.statusText));
        } else {
          return response.json();
        }
      })
      .then((data) => {
        console.log(data);
        dispatch(setProducts(data));
      })
      .catch(setError);

      return () => controller.abort();
  }, [dispatch]);

  useEffect(() => {
    dispatch(setIsFilterOpened(false));
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
        <div className={styles["catalog__products"]}>
          {Array.from({ length: 24 }).map(() => (
            <ProductCart key={Math.random()} />
          ))}
        </div>
      </div>
      <div className={styles["catalog__load-more-btn"]}>
        <Button type="secondary" text="load more" />
      </div>
    </div>
  );
};
