import cn from 'classnames';
import { FC } from "react";
import { ProductCart } from "../../../../../../components/ProductCart";
import { Product } from "../../../../../../types/Product";
import styles from './ProductList.module.scss';

type Props = {
  products: Product[];
  hasProducts: boolean;
}

export const ProductList: FC<Props> = ({ products, hasProducts }) => {
  return (
    <div
      className={cn(styles["product-list"], {
        [styles["product-list--empty"]]: !hasProducts,
      })}
    >
      {products.map((product) => (
        <ProductCart key={product.id} product={product} />
      ))}
    </div>
  );
};
