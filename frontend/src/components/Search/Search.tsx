import { FC, useState } from "react";
import styles from "./Search.module.scss";

export const Search: FC = () => {
  const [value, setValue] = useState("");

  return (
    <input
      className={styles["search"]}
      type="text"
      value={value}
      onChange={(e) => setValue(e.target.value)}
    />
  );
};
