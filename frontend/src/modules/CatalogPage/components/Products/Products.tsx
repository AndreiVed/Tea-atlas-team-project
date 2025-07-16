import { Loader } from "@/components/Loader";
import { useAppSelector } from "@/store/hooks";
import cn from "classnames";
import { FC } from "react";
import { useSearchParams } from "react-router-dom";
import { ProductList } from "./components/ProductList";
import { SearchResults } from "./components/SearchResults";
import styles from "./Products.module.scss";

export const Products: FC = () => {
  const { products, isProductsLoaded } = useAppSelector(
    (state) => state.products
  );
  const [searchParams] = useSearchParams();
  const nameParam = searchParams.get("name");
  const hasProducts = Boolean(products.length);

  return (
    <section
      className={cn(styles["products"], {
        [styles["products--empty"]]: !products.length,
        [styles["products--loading"]]: !isProductsLoaded,
      })}
    >
      {isProductsLoaded ? (
        <>
          <ProductList hasProducts={hasProducts} />
          <SearchResults nameParam={nameParam} hasProducts={hasProducts} />
        </>
      ) : (
        <Loader size="big" />
      )}
    </section>
  );
};
