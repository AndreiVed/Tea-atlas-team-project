import cn from "classnames";
import { FC, useEffect } from "react";
import { desktopWidth } from "../../../../config";
// import { useAppSelector } from "../../../../store/hooks";
import { setIsFilterOpened } from "../../../../features/filter/filterSlice";
import { useAppDispatch, useAppSelector } from "../../../../store/hooks";
import "../../../../styles/utils/mixins/font-mixins.scss";
import { FilterPanel } from "../FilterPanel";
import styles from "./Filter.module.scss";

// type Props = {}

export const Filter: FC = () => {
  const isBelowDesktop = window.innerWidth <= desktopWidth;
  const filtersCounter = 1;
  const dispatch = useAppDispatch();
  const isFilterOpened = useAppSelector((state) => state.filter.isFilterOpened);

  useEffect(() => {
    if (!isBelowDesktop) {
      // if IS on desktop, always show panel
      dispatch(setIsFilterOpened(!isFilterOpened));
      // setShowFilterPanel(true);
    }
  }, [isBelowDesktop]);

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
            onClick={() => {
              dispatch(setIsFilterOpened(true));
            }}
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
