import { API_ENDPOINTS } from "@/constants/endpoints";
import { updateLikedProducts } from "@/features/products/productsSlice";
import { useCursorEffect } from "@/hooks/useCursorEffect";
import { useFetchWithAuth } from "@/hooks/useFetchWithAuth";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { Product } from "@/types/Product";
import cn from "classnames";
import { FC, useState } from "react";
import styles from "./ToggleFavorite.module.scss";

type Props = {
  productId: number;
  usedIn: "catalog" | "liked-it";
};

export const ToggleFavorite: FC<Props> = ({ productId, usedIn }) => {
  const { handleMouseEnter, handleMouseLeave } = useCursorEffect();
  const { likedProducts } = useAppSelector((state) => state.products);
  const { isLoggedIn } = useAppSelector((state) => state.profile);
  const [error, setError] = useState("");
  const dispatch = useAppDispatch();
  const fetchWithAuth = useFetchWithAuth();

  const isLiked = Array.isArray(likedProducts)
    ? likedProducts.find((likedProduct) => likedProduct.id === productId)
    : undefined;
  const title = isLiked ? "Remove from favorites" : "Add to favorites";

  const handleTogglingProduct = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();

    if (!isLoggedIn) {
      return;
    }

    fetchWithAuth(
      API_ENDPOINTS.catalog.favoritesOperations(String(productId)),
      {
        method: "POST",
      }
    )
      .then()
      .catch((e) => setError(e))
      .finally(() => {
        if (!error) {
          fetchWithAuth(API_ENDPOINTS.auth.favoriteList, {
            method: "GET",
          }).then((data) => {
            dispatch(updateLikedProducts(data as Product[]));
            localStorage.removeItem("likedProducts");
            localStorage.setItem("likedProducts", JSON.stringify(data));
          });
        }
      });
  };

  return (
    <button
      className={cn(styles["toggle-favorite"], {
        [styles["toggle-favorite--liked"]]: isLiked && usedIn !== "liked-it",
        [styles["toggle-favorite--favorites-page"]]: usedIn === "liked-it", // anyway it will be liked in this case
      })}
      title={title}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleTogglingProduct}
    />
  );
};
