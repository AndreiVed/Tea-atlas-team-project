import { updateSelectedFilters } from "@/features/filter/filterSlice";
import { useCursorEffect } from "@/hooks/useCursorEffect";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { FilterOption } from "@/types/FilterOption";
import { FilterSection } from "@/types/FilterSection";
import cn from "classnames";
import { FC } from "react";
import styles from "./Checkbox.module.scss";

type Props = {
  option: FilterOption;
  usedForSection: FilterSection;
};

export const CheckBox: FC<Props> = ({ option, usedForSection }) => {
  const { handleMouseEnter, handleMouseLeave } = useCursorEffect();
  const dispatch = useAppDispatch();
  const { selectedFilters } = useAppSelector(
    (state) => state.filter
  );

  const { id, title, value } = option;
  const normalizedId = id.toString();

  const isChecked = selectedFilters[usedForSection].includes(value);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      dispatch(
        updateSelectedFilters({
          ...selectedFilters,
          [usedForSection]: [...selectedFilters[usedForSection], value],
        })
      );
    } else {
      dispatch(
        updateSelectedFilters({
          ...selectedFilters,
          [usedForSection]: selectedFilters[usedForSection].filter(
            (selectedFilter) => selectedFilter !== value
          ),
        })
      );
    }
  };

  return (
    <li className={styles["checkbox"]}>
      <label htmlFor={normalizedId} className={styles["checkbox__label"]}>
        <input
          type="checkbox"
          id={normalizedId}
          value={value}
          checked={isChecked}
          className={styles["checkbox__input"]}
          onChange={handleChange}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        />
        <span className={cn(styles["checkbox__text"], "main-text")}>
          {title}
        </span>
      </label>
    </li>
  );
};
