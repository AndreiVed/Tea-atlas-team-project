import { Loader } from "@/components/Loader";
import { filterOptions, selectedFiltersDefaults } from "@/constants";
import { screenEndpoints } from "@/constants/endpoints";
import { filterActions } from "@/features/filter/filterSlice";
import { loadAllProducts } from "@/handlers/loadAllProducts";
import { useCursorEffect, useLoadSelectedProducts } from "@/hooks";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { useWindowSize } from "@uidotdev/usehooks";
import cn from "classnames";
import { isEqual, some } from "lodash-es";
import { FC, FormEvent, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { FilterSection } from "./components/FilterSection";

import styles from "./FilterPanel.module.scss";

export const FilterPanel: FC = () => {
  const {
    updateIsFilterOpened,
    updateSelectedFilters,
    updateSubmittedFilters,
  } = filterActions;

  const { handleMouseEnter, handleMouseLeave } = useCursorEffect();
  const dispatch = useAppDispatch();
  const { width } = useWindowSize();
  const { isFilterOpened, selectedFilters, submittedFilters } = useAppSelector(
    (state) => state.filter
  );
  const [, setSearchParams] = useSearchParams();
  const { loadSelectedProducts } = useLoadSelectedProducts();
  const [loadingApply, setLoadingApply] = useState(false);
  const isDesktop = width && width >= screenEndpoints.desktop;
  const hasSelectedFilters = some(selectedFilters, (arr) => arr.length > 0);
  const hasSubmittedFilters = some(submittedFilters, (arr) => arr.length > 0);

  useEffect(() => {
    if (!isDesktop && isFilterOpened) {
      dispatch(updateIsFilterOpened(false));
    }
  }, []);

  useEffect(() => {
    if (isDesktop && isFilterOpened) {
      dispatch(updateIsFilterOpened(false));
    }
  }, [isDesktop, dispatch, isFilterOpened]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setLoadingApply(true);
    await loadSelectedProducts(selectedFilters);
    setLoadingApply(false);
    dispatch(updateIsFilterOpened(false));
  };

  const handleResettingFilters = () => {
    dispatch(updateSelectedFilters(selectedFiltersDefaults));
    loadAllProducts(dispatch);
    dispatch(updateSubmittedFilters(selectedFiltersDefaults));
    setSearchParams();
  };

  const isApplyDisabled =
    isEqual(submittedFilters, selectedFilters) ||
    (!hasSelectedFilters && !hasSubmittedFilters);

  const isResetAllBtnDisabled = !hasSelectedFilters && !hasSubmittedFilters

  return isFilterOpened || isDesktop ? (
    <section className={styles["filter"]}>
      <div className={styles["filter__header"]}>
        <p
          className={cn(
            styles["filter__header-text"],
            styles["navigation-text"]
          )}
        >
          filter
        </p>
        {!isDesktop ? (
          <button
            className={styles["filter__header-close-btn"]}
            onClick={() => dispatch(updateIsFilterOpened(false))}
          />
        ) : null}
      </div>
      <form className={styles["filter__form"]} onSubmit={handleSubmit}>
        <div className={styles["filter__top-buttons"]}>
          <button
            type="submit"
            className={styles["filter__top-buttons-apply"]}
            disabled={isApplyDisabled}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            {loadingApply ? (
              <Loader />
            ) : (
              <span className="button-text">apply</span>
            )}
          </button>
          <button
            className={styles["filter__top-buttons-clear-all-filters"]}
            disabled={isResetAllBtnDisabled}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onClick={handleResettingFilters}
          />
        </div>

        <div className={styles["filter__form-sections"]}>
          <FilterSection
            title="country"
            icon="/icons/planet.svg"
            options={filterOptions.countries}
          />

          <FilterSection
            title="impact"
            icon="/icons/hand-heart.svg"
            options={filterOptions.impact}
          />

          <FilterSection
            title="fermentation"
            icon="/icons/coffee.svg"
            options={filterOptions.fermentation}
          />

          <FilterSection
            title="type"
            icon="/icons/leaf.svg"
            options={filterOptions.type}
          />
        </div>
      </form>
    </section>
  ) : null;
};
