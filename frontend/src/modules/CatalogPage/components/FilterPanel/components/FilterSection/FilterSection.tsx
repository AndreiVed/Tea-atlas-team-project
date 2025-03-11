import cn from "classnames";
import { FC, useRef, useState } from "react";
import { FilterOption } from "../../../../../../types/FilterOption";
import { CheckBox } from "../Checkbox";
import styles from "./FilterSection.module.scss";

type Props = {
  title: string;
  icon: string;
  options: FilterOption[];
};

export const FilterSection: FC<Props> = ({ title, icon, options }) => {
  const [isListOpened, setIsListOpened] = useState(false);
  const listRef = useRef<HTMLUListElement>(null);

  return (
    <fieldset className={styles["filter-section"]}>
      <div
        className={styles["filter-section__heading"]}
        onClick={() => setIsListOpened((prev) => !prev)}
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
          // onClick={() => setIsListOpened(!isListOpened)}
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
            <CheckBox key={option.id} option={option} />
          ))}
        </ul>
      </div>
    </fieldset>
  );
};
