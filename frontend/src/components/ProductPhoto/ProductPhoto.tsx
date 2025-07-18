import cn from "classnames";
import { FC, useState } from "react";
import { Loader } from "../Loader";
import styles from "./ProductPhoto.module.scss";

type Props = {
  image: string;
  usedInPage?: boolean;
};

export const ProductPhoto: FC<Props> = ({ image, usedInPage }) => {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);

  if (!image || error) {
    return (
      <div
        className={cn(styles["product-photo-empty"], {
          [styles["product-photo-empty--product-page"]]: usedInPage,
        })}
        title="This product has no image"
      />
    );
  }

  return (
    <div className={styles["product-photo-wrapper"]}>
      {!loaded && (
        <div className={styles["product-photo-loader"]}>
          <Loader />
        </div>
      )}
      <img
        className={cn(
          styles["product-photo"],
          [styles["product-photo--product-page"]],
          { [styles["product-photo--hidden"]]: !loaded }
        )}
        src={image}
        onLoad={() => setLoaded(true)}
        onError={() => setError(true)}
        alt="Product"
      />
    </div>
  );
};
