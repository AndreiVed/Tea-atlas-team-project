import { updateShowSearch } from "@/features/search/searchSlice";
import { useCursorEffect } from "@/hooks/useCursorEffect";
import { useAppDispatch } from "@/store/hooks";
import { ChangeEvent, FC, useRef, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import styles from "./Search.module.scss";

export const Search: FC = () => {
  const { handleMouseEnter, handleMouseLeave } = useCursorEffect();
  const [value, setValue] = useState("");
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [, setSearchParams] = useSearchParams();

  const inputRef = useRef<HTMLInputElement>(null);

  const handleClearBtnClick = () => {
    dispatch(updateShowSearch(false));
    handleMouseLeave();
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  }

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if(event.key === "Enter") {
      const params = new URLSearchParams();

      params.set("name", value);

      setSearchParams(params);
      navigate(`/catalog?${params}`);
      
    }
  }

  const handleSearchClick = () => inputRef.current?.focus();

  return (
    <div
      className={styles["search-container"]}
      onClick={handleSearchClick}
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
        onChange={handleChange}
        onKeyDown={handleKeyDown}
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
