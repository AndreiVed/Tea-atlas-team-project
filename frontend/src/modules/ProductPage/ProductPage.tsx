import { Banner } from "@/components/Banner";
import { ProductCart } from "@/components/ProductCart";
import { ProductPhoto } from "@/components/ProductPhoto";
import { API_ENDPOINTS } from "@/constants/endpoints";
import { updateLikedProducts } from "@/features/products/productsSlice";
import { fetchWithAuth } from "@/handlers/fetchWithAuth";
import { loadAllProducts } from "@/handlers/loadAllProducts";
import { useCursorEffect } from "@/hooks/useCursorEffect";
import { useScroll } from "@/hooks/useScroll";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { Product } from "@/types/Product";
import { ProductExtended } from "@/types/ProductExtended";
import cn from "classnames";
import { FC, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styles from "./ProductPage.module.scss";
import { ProductCharacteristics } from "./components/ProductCharacteristics";
import { SteepingInstructions } from "./components/SteepingInstructions";

type CurrentProduct = ProductExtended | null;

export const ProductPage: FC = () => {
  useScroll({ options: { top: 0, behavior: "instant" } });

  const [isTogglingFavorites, setIsTogglingFavorites] = useState(false);
  const [currentProduct, setCurrentProduct] = useState<CurrentProduct>(null);
  const { isLoggedIn, access } = useAppSelector((state) => state.profile);
  const { likedProducts, products } = useAppSelector((state) => state.products);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { handleMouseEnter, handleMouseLeave } = useCursorEffect();
  const { id } = useParams();

  if (!products.length) {
    loadAllProducts(dispatch);
  }

  const isInFavorites = Array.isArray(likedProducts)
    ? likedProducts.find((product) => product.id === currentProduct?.id)
    : undefined;

  const handleViewAllBtnClick = () => {
    navigate("/catalog");
    handleMouseLeave();
  };

  useEffect(() => {
    if (!id) {
      navigate("/catalog");
      return;
    }

    const fetchProduct = async () => {
      try {
        const response = await fetch(API_ENDPOINTS.catalog.loadProductPage(id));

        if (!response.ok) {
          if (response.status === 404) {
            throw new Error("Product not found");
          }

          throw new Error("Server error");
        }

        const data = await response.json();
        setCurrentProduct(data);
      } catch {
        navigate("/page-not-found", { replace: true });
      }
    };

    fetchProduct();
  }, [id, navigate]);

  if (!currentProduct) {
    return;
  }

  const handleManipulatingFavList = () => {
    if (!id) {
      return;
    }

    if(!isLoggedIn) {
      return 
    }

    setIsTogglingFavorites(true);

    fetchWithAuth(
      API_ENDPOINTS.catalog.favoritesOperations(id),
      {
        method: "POST",
      },
      access,
      dispatch
    ).then(() => {
      fetchWithAuth(
        API_ENDPOINTS.auth.favoriteList,
        {
          method: "GET",
        },
        access,
        dispatch
      )
        .then((data) => {
          dispatch(updateLikedProducts(data as Product[]));
          localStorage.removeItem("likedProducts");
          localStorage.setItem("likedProducts", JSON.stringify(likedProducts));
        })
        .finally(() => {
          setIsTogglingFavorites(false);
        });
    });
  };

  const { name, description, image, category, impact, descriptors } =
    currentProduct;

  const handleLearnMoreClick = () => {
    navigate("/blog/tea-brewing-essentials");
    handleMouseLeave();
  };

  return (
    <section className={styles["product"]}>
      <div className={styles["product__top-info-wrap"]}>
        <ProductPhoto image={image} usedInPage />
        <div className={styles["product__characteristics-wrap"]}>
          <div className={styles["product__top"]}>
            <h2 className={styles["product__title"]}>{name}</h2>
            <button
              className={cn(styles["product__add-to-fav"], {
                [styles["product__add-to-fav--filled"]]: isInFavorites,
              })}
              title={
                isInFavorites ? "Remove from favorites" : "Add to favorites"
              }
              disabled={!isLoggedIn || isTogglingFavorites}
              onClick={handleManipulatingFavList}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            />
          </div>
          <h3 className={styles["product__tea-type"]}>{category.name}</h3>
          <div className={styles["product__chars-wrap"]}>
            <ProductCharacteristics
              category={category}
              impact={impact}
              descriptors={descriptors}
            />
            <SteepingInstructions />
          </div>
        </div>
        <div className={styles["product__about"]}>
          <h3 className={styles["product__about-title"]}>About the product</h3>
          <p className={styles["product__about-desc"]}>{description}</p>
        </div>
      </div>

      <div className={styles["product__you-may-like"]}>
        <div className={styles["product__you-may-like-top"]}>
          <h4 className={styles["product__you-may-like-title"]}>
            You may also like
          </h4>
          <button
            className={cn(
              styles["product__you-may-like-view-btn"],
              "link-button"
            )}
            onClick={handleViewAllBtnClick}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            view all
          </button>
        </div>
        <div className={styles["product__recommended-products"]}>
          {products.slice(0, 4).map((product) => (
            <ProductCart
              key={product.id}
              product={product}
              usedIn="catalog"
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            />
          ))}
        </div>
      </div>

      <div className={styles["product__learn-more"]}>
        <Banner
          baseSrc="/banners/productpage/learn-more.webp"
          className="product__learn-more-banner"
        />
        <button
          className={styles["product__learn-more-btn"]}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onClick={handleLearnMoreClick}
        >
          Learn more about brewing tea
        </button>
      </div>
    </section>
  );
};
