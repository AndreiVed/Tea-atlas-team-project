import { FC } from "react";
import { useNavigate } from "react-router-dom";
import { useCursorEffect } from "../../hooks/useCursorEffect";
import { Product } from "../../types/Product";
import styles from "./ProductCart.module.scss";
import { ToggleFavorite } from "./components/ToggleFavorite";

type Props = {
  product: Product;
  usedIn: "catalog" | "liked-it";
  onClick?: () => void;
};
export const ProductCart: FC<Props> = ({ product, usedIn, onClick }) => {
  const { id, name, descriptors, image, category } = product;
  const { handleMouseEnter, handleMouseLeave } = useCursorEffect();
  const navigate = useNavigate();

  const isMoreThanTwoCategories = descriptors.length > 2;
  const howMuchMore = isMoreThanTwoCategories ? descriptors.length - 2 : 0;

  const showedDescriptors = isMoreThanTwoCategories
    ? descriptors.slice(0, 2)
    : descriptors;

  const handleCartClick = () => {
    if (onClick) {
      onClick();
    }

    handleMouseLeave();
    navigate(`/product/${id}`);
  };

  return (
    <article
      className={styles["product"]}
      onClick={handleCartClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <img className={styles["product__photo"]} src={image} alt="Product" />
      <ToggleFavorite productId={id} usedIn={usedIn} />
      <div className={styles["product__info"]}>
        <h3 className={styles["product__info-title"]}>{name}</h3>
        <p className={styles["product__info-tea-type"]}>{category}</p>
        <div className={styles["product__info-categories"]}>
          {showedDescriptors.map((descriptor) => (
            <p
              key={descriptor}
              className={styles["product__info-categories-category"]}
            >
              {descriptor}
            </p>
          ))}
          {isMoreThanTwoCategories ? (
            <p
              className={styles["product__info-categories-more"]}
            >{`+${howMuchMore} more`}</p>
          ) : null}
        </div>
      </div>
    </article>
  );
};
