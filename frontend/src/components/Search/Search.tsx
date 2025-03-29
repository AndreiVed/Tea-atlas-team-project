import { FC, useRef, useState } from "react";
import { changeShowSearch } from "../../features/search/searchSlice";
import { useCursorEffect } from "../../hooks/useCursorEffect";
import { useAppDispatch } from "../../store/hooks";
import styles from "./Search.module.scss";

export const Search: FC = () => {
  const { handleMouseEnter, handleMouseLeave } = useCursorEffect();
  const [value, setValue] = useState("");
  const dispatch = useAppDispatch();

  const inputRef = useRef<HTMLInputElement>(null);

  const handleClearBtnClick = () => {
    dispatch(changeShowSearch(false));
    handleMouseLeave();
  };

  return (
    <div
      className={styles["search-container"]}
      onClick={() => inputRef.current?.focus()}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <input
        className={styles["search-container__input"]}
        type="search"
        placeholder="Search"
        ref={inputRef}
        aria-label="Search"
        value={value}
        autoFocus
        onChange={(e) => setValue(e.target.value)}
      />
      <button
        type="button"
        className={styles["search-container__clear-btn"]}
        aria-label="Clear search"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={handleClearBtnClick}
      />
    </div>
  );
};
