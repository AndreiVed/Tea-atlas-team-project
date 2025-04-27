import { FC } from "react";
import { ProductCart } from "../../../../components/ProductCart";
import { useAppSelector } from "../../../../store/hooks";

export const Products: FC = () => {
  const { products } = useAppSelector((state) => state.products);

  return !products.length ? (
    <h1>Oops! No products found!</h1>
  ) : (
    products.map((product) => (
      <ProductCart key={product.id} product={product} />
    ))
  );
};
