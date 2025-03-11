import cn from "classnames";
import { FC } from "react";
import { FilterOption } from "../../../../../../types/FilterOption";
import styles from "./Checkbox.module.scss";
// import { useAppDispatch } from "../../../../../../app/hooks";
// import { useSearchParams } from "react-router-dom";

type Props = {
  option: FilterOption;
};

export const CheckBox: FC<Props> = ({ option }) => {
  // const [searchParams, setSearchParams] = useSearchParams();
  // const dispatch = useAppDispatch();

  const { id, title, value } = option;
  const normalizedId = id.toString();

  return (
    <li className={styles["checkbox"]}>
      <label htmlFor={normalizedId} className={styles["checkbox__label"]}>
        <input
          type="checkbox"
          id={normalizedId}
          value={value}
          className={styles["checkbox__input"]}
          // onChange={}
        />
        <span className={cn(styles["checkbox__text"], "main-text")}>
          {title}
        </span>
      </label>
    </li>
  );
};
