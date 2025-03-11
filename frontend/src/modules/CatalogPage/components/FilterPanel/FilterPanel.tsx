import cn from "classnames";
import { FC } from "react";
import { desktopWidth } from "../../../../config";
import { setIsFilterOpened } from "../../../../features/filter/filterSlice";
import { useAppDispatch, useAppSelector } from "../../../../store/hooks";
import { FilterSection } from "./components/FilterSection";
import { countriesOptions, fermentationOptions, impactOptions } from "./config";
import styles from "./FilterPanel.module.scss";

export const FilterPanel: FC = () => {
  const dispatch = useAppDispatch();
  const isFilterOpened = useAppSelector((state) => state.filter.isFilterOpened);
  const isBelowDesktop = window.innerWidth <= desktopWidth;

  return isFilterOpened || !isBelowDesktop ? (
    <section
      className={cn(styles["filter"], {
        [styles["filter--desktop"]]: !isBelowDesktop,
      })}
    >
      <div className={styles["filter__header"]}>
        <p
          className={cn(
            styles["filter__header-text"],
            styles["navigation-text"]
          )}
        >
          filter
        </p>
        {isBelowDesktop ? (
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
            disabled
          >
            <span className="button-text">apply</span>
          </button>
          <button
            className={styles["filter__top-buttons-clear-all-filters"]}
            disabled={true}
          />
        </div>

        <div className={styles["filter__form-sections"]}>
          <FilterSection
            title="Country"
            icon="/icons/planet.svg"
            options={countriesOptions}
          />

          <FilterSection
            title="Impact"
            icon="/icons/hand-heart.svg"
            options={impactOptions}
          />

          <FilterSection
            title="Fermentation"
            icon="/icons/coffee.svg"
            options={fermentationOptions}
          />
        </div>
      </form>
    </section>
  ) : null;
};
