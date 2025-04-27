import { useWindowSize } from "@uidotdev/usehooks";
import cn from "classnames";
import { FC, useEffect } from "react";
import { screenEndpoints } from "../../../../endpoints";
import { updateIsFilterOpened } from "../../../../features/filter/filterSlice";
import { useAppDispatch, useAppSelector } from "../../../../store/hooks";
import "../../../../styles/utils/mixins/font-mixins.scss";
import { FilterPanel } from "../FilterPanel";
import styles from "./Filter.module.scss";

export const Filter: FC = () => {
  const { width } = useWindowSize();
  const isBelowDesktop = width ? width <= screenEndpoints.desktop : undefined;
  const filtersCounter = 1;
  const dispatch = useAppDispatch();
  const isFilterOpened = useAppSelector((state) => state.filter.isFilterOpened);

  useEffect(() => {
    if (!isBelowDesktop) {
      // always show panel always show panel on desktop
      dispatch(updateIsFilterOpened(!isFilterOpened));
    }
  }, [isBelowDesktop, dispatch, isFilterOpened]);

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
          <button className={cn(styles["filter__reset"])}>
            <p className={cn("link-button", styles["reset-margins"])}>
              reset all
            </p>
          </button>
        </div>
      </div>

      <FilterPanel />
    </>
  );
};
