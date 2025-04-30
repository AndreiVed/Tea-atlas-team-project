import { FC } from "react";
import { useSearchParams } from "react-router-dom";
import { ProductCart } from "../../../../components/ProductCart";
import { useAppSelector } from "../../../../store/hooks";

export const Products: FC = () => {
  const { products } = useAppSelector((state) => state.products);

  const [searchParams] = useSearchParams();

  const nameParam = searchParams.get("name");

  const errorText =
    !products.length && !nameParam ? (
      <h1>Oops! No products found</h1>
    ) : !products.length && nameParam ? (
      <div>
        <h1>Search results: {nameParam}</h1>
        <p className="large-text">
          No results found for "{nameParam}". Check the spelling or use a
          different word or phrase.
        </p>
      </div>
    ) : null;

  return (
    <div className="products">
      {errorText}
      {products.map((product) => (
        <ProductCart key={product.id} product={product} />
      ))}
    </div>
  );
};
