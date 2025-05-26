import cn from "classnames";
import { FC } from "react";
import styles from "./ProductPhoto.module.scss";

type Props = {
  image: string;
  usedInPage?: boolean;
};

export const ProductPhoto: FC<Props> = ({ image, usedInPage }) => {
  return image ? (
    <img
      className={cn(styles["product-photo"], [
        styles["product-photo--product-page"],
      ])}
      src={image}
      alt="Product"
    />
  ) : (
    <div
      className={cn(styles["product-photo-empty"], {
        [styles["product-photo-empty--product-page"]]: usedInPage,
      })}
      title="This product has no image"
    />
  );
};
