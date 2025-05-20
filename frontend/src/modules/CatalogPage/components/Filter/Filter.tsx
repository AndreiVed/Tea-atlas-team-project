import { screenEndpoints } from "@/constants/endpoints";
import { selectedFiltersDefaults } from "@/constants/formsInitials";
import { filterActions } from "@/features/filter/filterSlice";
import { loadAllProducts } from "@/handlers/loadAllProducts";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import "@/styles/utils/mixins/font-mixins.scss";
import { useWindowSize } from "@uidotdev/usehooks";
import cn from "classnames";
import { some } from "lodash-es";
import { FC, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { FilterPanel } from "../FilterPanel";
import styles from "./Filter.module.scss";

export const Filter: FC = () => {
  const {
    updateIsFilterOpened,
    updateSelectedFilters,
    updateSubmittedFilters,
  } = filterActions;

  const { width } = useWindowSize();
  const isBelowDesktop = width ? width <= screenEndpoints.desktop : undefined;
  const dispatch = useAppDispatch();
  const { isFilterOpened, selectedFilters } = useAppSelector(
    (state) => state.filter
  );
  const [, setSearchParams] = useSearchParams();

  const filtersCounter = Object.values(selectedFilters).flatMap((value) =>
    Array.isArray(value) ? value : value ? [value] : []
  ).length;

  const handleResettingAllFilters = () => {
    dispatch(updateSelectedFilters(selectedFiltersDefaults));
    dispatch(updateSubmittedFilters(selectedFiltersDefaults));
    loadAllProducts(dispatch);
    setSearchParams();
  };

  useEffect(() => {
    if (!isBelowDesktop) {
      // always show panel always show panel on desktop
      dispatch(updateIsFilterOpened(!isFilterOpened));
    }
  }, [isBelowDesktop, dispatch, isFilterOpened]);

  const hasSelectedFilters = some(selectedFilters, (arr) => arr.length > 0);

  return (
    <>
      <div
        className={cn(styles["filter"], {
          [styles["filter--desktop"]]: !isBelowDesktop,
        })}
      >
        <div className={styles["filter__heading"]}>
          <button
            className={styles["filter__button"]}
            onClick={() => dispatch(updateIsFilterOpened(true))}
          >
            <img
              src="/icons/filter.svg"
              alt="Filter"
              className={styles["filter__button-icon"]}
            />
            <p className={cn(styles["filter__button-text"], "navigation-text")}>
              filter
            </p>
            <p className={styles["filter__button-counter"]}>{filtersCounter}</p>
          </button>
          {hasSelectedFilters ? (
            <button
              className={cn(styles["filter__reset"])}
              onClick={handleResettingAllFilters}
            >
              <p className={cn("link-button", styles["reset-margins"])}>
                reset all
              </p>
            </button>
          ) : null}
        </div>
      </div>

      <FilterPanel />
    </>
  );
};
