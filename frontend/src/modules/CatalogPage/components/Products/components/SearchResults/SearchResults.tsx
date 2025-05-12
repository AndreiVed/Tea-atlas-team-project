import { FC } from "react";
import styles from "./SearchResults.module.scss";

type Props = {
  nameParam: string | null;
  hasProducts: boolean;
};

export const SearchResults: FC<Props> = ({ nameParam, hasProducts }) => {
  if (!nameParam && !hasProducts) {
    return (
      <h2 className={styles["no-products-found"]}>Oops! No products found</h2>
    );
  }

  if (!nameParam) {
    return null;
  }

  return (
    <div className={styles["search-results"]}>
      <h3 className={styles["search-results__title"]}>
        Search results:{" "}
        <span className={styles["search-results__param"]}>“{nameParam}”</span>
      </h3>
      {nameParam && !hasProducts ? (
        <p className="large-text">
          No results found for "{nameParam}". Check the spelling or use a
          different word or phrase.
        </p>
      ) : null}
    </div>
  );
};
