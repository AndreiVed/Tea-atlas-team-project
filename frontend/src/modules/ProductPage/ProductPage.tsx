import cn from "classnames";
import { FC, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Banner } from "../../components/Banner";
// import { ProductCart } from "../../components/ProductCart";
import { API_ENDPOINTS } from "../../endpoints";
import { fetchWithAuth } from "../../handlers/fetchWithToken";
import { useCursorEffect } from "../../hooks/useCursorEffect";
import { useScroll } from "../../hooks/useScroll";
import { useAppSelector } from "../../store/hooks";
import { ProductExtended } from "../../types/ProductExtended";
import styles from "./ProductPage.module.scss";
import { ProductCharacteristics } from "./components/ProductCharacteristics";
import { SteepingInstructions } from "./components/SteepingInstructions";

type CurrentProduct = ProductExtended | null;

export const ProductPage: FC = () => {
  useScroll({ options: { top: 0, behavior: "instant" } });

  const [currentProduct, setCurrentProduct] = useState<CurrentProduct>(null);
  const { token, isLoggedIn } = useAppSelector((state) => state.profile);
  const navigate = useNavigate();
  const { handleMouseEnter, handleMouseLeave } = useCursorEffect();
  const { id } = useParams();
  const [isInFavs, setIsInFavs] = useState(false);

  useEffect(() => {
    if (!id) {
      return;
    }

    fetch(API_ENDPOINTS.catalog.loadProductPage(id.toString()), {
      method: "GET",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Something went wrong.");
        }

        return response.json();
      })
      .then((data) => {
        setCurrentProduct(data);
        navigate(`/product/${id}`);
      })
      .catch();
  }, [navigate, id]);

  if (!currentProduct) {
    navigate("/page-not-found");

    return;
  }

  const handleManipulatingFavList = () => {
    fetchWithAuth(
      API_ENDPOINTS.catalog.favoritesOperations(id ? id : ""),
      {
        method: "POST",
        body: id,
      },
      token
    ).then(() => setIsInFavs(true));
  };

  const { name, description, image, category, impact, descriptors } =
    currentProduct;

  return (
    <section className={styles["product"]}>
      <div className={styles["product__top-info-wrap"]}>
        <img
          className={styles["product__photo"]}
          src={image}
          alt="Product photo"
        />
        <div className={styles["product__characteristics-wrap"]}>
          <div className={styles["product__top"]}>
            <h2 className={styles["product__title"]}>{name}</h2>
            <button
              className={cn(styles["product__add-to-fav"], {
                [styles["product__add-to-fav--filled"]]: isInFavs,
              })}
              disabled={!isLoggedIn}
              onClick={handleManipulatingFavList}
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
          >
            view all
          </button>
        </div>
        <div className={styles["product__recommended-products"]}>
          {/* {Array.from({ length: 4 }).map(() => (
            <ProductCart key={Math.random()} />
          ))} */}
        </div>
      </div>

      <div className={styles["product__learn-more"]}>
        <Banner
          baseSrc="/banners/productpage/learn-more.jpg"
          className="product__learn-more-banner"
        />
        <h4
          className={styles["product__learn-more-text"]}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onClick={() => {
            navigate("/blog/tea-brewing-essentials");
            handleMouseLeave();
          }}
        >
          Learn more about brewing tea
        </h4>
      </div>
    </section>
  );
};
