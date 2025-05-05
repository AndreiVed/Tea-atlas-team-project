import cn from "classnames";
import { FC, useRef, useState } from "react";
import { FilterOption } from "../../../../../../types/FilterOption";
import { FilterSection as FilterSectionType } from "../../../../../../types/FilterSection";
import { CheckBox } from "../Checkbox";
import styles from "./FilterSection.module.scss";

type Props = {
  title: FilterSectionType;
  icon: string;
  options: FilterOption[];
};

export const FilterSection: FC<Props> = ({ title, icon, options }) => {
  const [isListOpened, setIsListOpened] = useState(false);
  const listRef = useRef<HTMLUListElement>(null);

  return (
    <fieldset
      className={styles["filter-section"]}
      onClick={() => {
        if (!isListOpened) {
          setIsListOpened(true);
        }
      }}
    >
      <div
        className={styles["filter-section__heading"]}
        onClick={() => {
          if (isListOpened) {
            setIsListOpened(false);
          }
        }}
      >
        <img
          className={styles["filter-section__heading-logo"]}
          src={icon}
          alt={title}
        />
        <span
          className={cn(styles["filter-section__heading-text"], "main-text")}
        >
          {title}
        </span>
        <button
          className={cn(styles["filter-section__heading-arrow-btn"], {
            [styles["filter-section__heading-arrow-btn--clicked"]]:
              isListOpened,
          })}
        />
      </div>
      <div
        className={styles["filter-section__list-wrapper"]}
        style={{
          height: isListOpened ? `${listRef.current?.scrollHeight}px` : "0px",
        }}
      >
        <ul ref={listRef} className={styles["filter-section__list"]}>
          {options.map((option) => (
            <CheckBox key={option.id} option={option} usedForSection={title} />
          ))}
        </ul>
      </div>
    </fieldset>
  );
};
