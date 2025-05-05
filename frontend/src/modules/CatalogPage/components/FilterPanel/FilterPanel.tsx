// libraries
import { useThrottle, useWindowSize } from "@uidotdev/usehooks";
import cn from "classnames";
import { isEqual, some } from "lodash-es";
import { FC, FormEvent, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

// components
import { Loader } from "../../../../components/Loader";
import { FilterSection } from "./components/FilterSection";

// constants
import {
  countriesOptions,
  fermentationOptions,
  impactOptions,
  selectedFiltersDefaults,
  typeOptions,
} from "../../../../constants";

// ednpoints
import { screenEndpoints } from "../../../../endpoints";

// redux slice / actions
import {
  updateIsFilterOpened,
  updateSelectedFilters,
  updateSubmittedFilters,
} from "../../../../features/filter/filterSlice";

// handlers
import { loadAllProducts } from "../../../../handlers/loadAllProducts";

//hooks
import { useCursorEffect, useLoadSelectedProducts } from "../../../../hooks";
import { useAppDispatch, useAppSelector } from "../../../../store/hooks";

import styles from "./FilterPanel.module.scss";

export const FilterPanel: FC = () => {
  const { handleMouseEnter, handleMouseLeave } = useCursorEffect();
  const dispatch = useAppDispatch();
  const { width } = useWindowSize();
  const { isFilterOpened, selectedFilters, submittedFilters } = useAppSelector(
    (state) => state.filter
  );
  const [, setSearchParams] = useSearchParams();
  const { loadSelectedProducts } = useLoadSelectedProducts();
  const [loadingApply, setLoadingApply] = useState(false);
  const throttledWidth = useThrottle(width, 200);
  const isDesktop = throttledWidth
    ? throttledWidth > screenEndpoints.desktop
    : false;

  const hasSelectedFilters = some(selectedFilters, (arr) => arr.length > 0);

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

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setLoadingApply(true);
    loadSelectedProducts(selectedFilters);
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
    isEqual(submittedFilters, selectedFilters) || !hasSelectedFilters;

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
            disabled={!hasSelectedFilters}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onClick={handleResettingFilters}
          />
        </div>

        <div className={styles["filter__form-sections"]}>
          <FilterSection
            title="country"
            icon="/icons/planet.svg"
            options={countriesOptions}
          />

          <FilterSection
            title="impact"
            icon="/icons/hand-heart.svg"
            options={impactOptions}
          />

          <FilterSection
            title="fermentation"
            icon="/icons/coffee.svg"
            options={fermentationOptions}
          />

          <FilterSection
            title="type"
            icon="/icons/leaf.svg"
            options={typeOptions}
          />
        </div>
      </form>
    </section>
  ) : null;
};
