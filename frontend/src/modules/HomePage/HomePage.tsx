import { Banner } from "@/components/Banner";
import { GeneralButton } from "@/components/GeneralButton/GeneralButton";
import { API_ENDPOINTS } from "@/constants";
import { updateUserInfo } from "@/features/profile/profileSlice";
import { useScroll } from "@/hooks/useScroll";
import { useAppDispatch } from "@/store/hooks";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Carousel } from "./components/Carousel";
import { LoginErrorModal } from "./components/LoginErrorModal";
import styles from "./HomePage.module.scss";

export const HomePage = () => {
  useScroll({ options: { top: 0, behavior: "instant" } });
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [isLoginError, setIsLoginError] = useState(false);

  useEffect(() => {
    const query = new URLSearchParams(location.search);
    const code = query.get("code");
    const state = query.get("state");

    console.log(state);

    if (code && state) {
      fetch(API_ENDPOINTS.google_auth.login, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          code,
          state,
          redirect_uri: "https://tea-atlas.onrender.com/",
        }),
      })
        .then((res) => {
          if (!res.ok) throw new Error("Auth failed");
          return res.json();
        })
        .then((data) => {
          localStorage.setItem("refresh", data.refresh);
          localStorage.setItem("access", data.access);
          dispatch(updateUserInfo(data.user));
        })
        .catch(() => {
          setIsLoginError(true);
        })
        .finally(() => {
          navigate("/", { replace: true });
        });
    }
  }, [location.search]);

  return (
    <>
      {isLoginError ? (
        <LoginErrorModal setIsLoginError={setIsLoginError} />
      ) : null}
      <section className={styles["discover-world-of-tea"]}>
        <Banner
          className="discover-world-of-tea__banner"
          baseSrc="/banners/homepage/teapot-with-tea-bright-table.webp"
        />
        <div className={styles["discover-world-of-tea__wrap"]}>
          <h2 className={styles["discover-world-of-tea__title"]}>
            Discover the <br />
            world of Tea
          </h2>
          <GeneralButton type="secondary" text="TEA CATALOG" to="/catalog" />
        </div>
      </section>
      <section className={styles["tea-catalog"]}>
        <Banner
          className="tea-catalog__banner"
          baseSrc="/banners/homepage/tea-catalog-banner.webp"
        />
        <div className={styles["tea-catalog__info"]}>
          <h3 className={styles["tea-catalog__info-title"]}>Tea Catalog</h3>
          <p className={styles["tea-catalog__info-description"]}>
            Browse our selection of teas from different regions, each with its
            unique flavor profile and history. Use filters to find the perfect
            tea for your taste
          </p>
          <GeneralButton type="secondary" text="TEA CATALOG" to="/catalog" />
        </div>
      </section>
      <section className={styles["carousel"]}>
        <h3 className={styles["carousel__title"]}>Tea by Country</h3>
        <Carousel />
      </section>

      <section className={styles["guide"]}>
        <Banner
          className="guide__banner"
          baseSrc="/banners/homepage/brewing.webp"
        />
        <div className={styles["guide__info"]}>
          <h3 className={styles["guide__info-title"]}>Brewing Guide</h3>
          <p className={styles["guide__info-description"]}>
            Learn the art of tea brewing with expert tips and step-by-step
            instructions to unlock the full aroma and taste of your favorite
            teas
          </p>
          <GeneralButton
            type="secondary"
            text="BREWING GUIDE"
            to="/blog/tea-brewing-essentials"
          />
        </div>
      </section>

      <section className={styles["blog"]}>
        <h3 className={styles["blog__title"]}>Tea Culture & Stories</h3>
        <p className={styles["blog__description"]}>
          Browse our selection of teas from different regions, each with its
          unique flavor profile and history. Use filters to find the perfect tea
          for your taste
        </p>
        <GeneralButton type="secondary" text="BLOG" to="/blog" />
      </section>
    </>
  );
};
