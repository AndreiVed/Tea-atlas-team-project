import { FC } from "react";
import { useNavigate } from "react-router-dom";
import { useCursorEffect } from "../../hooks/useCursorEffect";
import { Product } from "../../types/Product";
import styles from "./ProductCart.module.scss";

type Props = {
  product: Product;
};
export const ProductCart: FC<Props> = ({ product }) => {
  const { id, name, descriptors, image, category } = product;
  const { handleMouseEnter, handleMouseLeave } = useCursorEffect();
  const navigate = useNavigate();

  const isMoreThanThreeCategories = descriptors.length > 3;
  const howMuchMore = isMoreThanThreeCategories ? descriptors.length - 3 : 0;

  const showedDescriptors = isMoreThanThreeCategories
    ? descriptors.slice(0, 3)
    : descriptors;

  const handleCartClick = () => {
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
          {isMoreThanThreeCategories ? (
            <p className="additional-text">{`+${howMuchMore} more`}</p>
          ) : null}
          {/* <p className={styles["product__info-categories-category"]}>Sweet</p>
          <p className={styles["product__info-categories-category"]}>Creamy</p>
          <p className={styles["product__info-categories-category"]}>Spicy</p> */}
        </div>
      </div>
    </article>
  );
};
