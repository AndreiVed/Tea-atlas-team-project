import { ProductCart } from "@/components/ProductCart";
import { useAppSelector } from "@/store/hooks";
import cn from "classnames";
import { FC } from "react";
import styles from "./ProductList.module.scss";

type Props = {
  hasProducts: boolean;
};

export const ProductList: FC<Props> = ({ hasProducts }) => {
  const { currentPage, productsPerPage, products } = useAppSelector(
    (state) => state.products
  );

  const paginateTo = currentPage * productsPerPage;

  return (
    <div
      className={cn(styles["product-list"], {
        [styles["product-list--empty"]]: !hasProducts,
        [styles["product-list--fully-loaded"]]: paginateTo >= products.length,
      })}
    >
      {products.slice(0, paginateTo).map((product) => (
        <ProductCart key={product.id} product={product} usedIn="catalog" />
      ))}
    </div>
  );
};
