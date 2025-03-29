import { useThrottle, useWindowSize } from "@uidotdev/usehooks";
import cn from "classnames";
import { FC, useEffect, useState } from "react";
import { endpoints } from "../../../../config";
import { setIsFilterOpened } from "../../../../features/filter/filterSlice";
import { useCursorEffect } from "../../../../hooks/useCursorEffect";
import { useAppDispatch, useAppSelector } from "../../../../store/hooks";
import { FilterSection } from "./components/FilterSection";
import { countriesOptions, fermentationOptions, impactOptions } from "./config";
import styles from "./FilterPanel.module.scss";

export const FilterPanel: FC = () => {
  const { handleMouseEnter, handleMouseLeave } = useCursorEffect();
  const dispatch = useAppDispatch();
  const { width } = useWindowSize();
  const { isFilterOpened, selectedFilters } = useAppSelector(
    (state) => state.filter
  );
  const [hasSelectedFilters, setHasSelectedFilters] = useState(false);
  const throttledWidth = useThrottle(width, 200);
  const isDesktop = throttledWidth ? throttledWidth > endpoints.desktop : false;

  useEffect(() => {
    setHasSelectedFilters(
      Object.values(selectedFilters).some((arr) => arr.length > 0)
    );
  }, [selectedFilters]);

  useEffect(() => {
    if (!isDesktop && isFilterOpened) {
      dispatch(setIsFilterOpened(false));
    }
  }, []);

  useEffect(() => {
    if (isDesktop && isFilterOpened) {
      dispatch(setIsFilterOpened(false));
    }
  }, [isDesktop, dispatch, isFilterOpened]);

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
            onClick={() => dispatch(setIsFilterOpened(false))}
          />
        ) : null}
      </div>
      <form className={styles["filter__form"]}>
        <div className={styles["filter__top-buttons"]}>
          <button
            type="submit"
            className={styles["filter__top-buttons-apply"]}
            disabled={!hasSelectedFilters}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <span className="button-text">apply</span>
          </button>
          <button
            className={styles["filter__top-buttons-clear-all-filters"]}
            disabled={!hasSelectedFilters}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
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
        </div>
      </form>
    </section>
  ) : null;
};
