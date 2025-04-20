import cn from "classnames";
import { FC } from "react";
import { Banner } from "../../components/Banner";
import { useScroll } from "../../hooks/useScroll";
import styles from "./SpecificBlogPage.module.scss";

/*
  this page's routing and code is hardcoded,
  because my team and I decided not to implement backend
*/

export const SpecificBlogPage: FC = () => {
  useScroll({ options: { top: 0, behavior: "instant" } });

  return (
    <section className={styles["specific-blog"]}>
      <div className={styles["specific-blog__banner-wrap"]}>
        <Banner
          className="specific-blog__banner"
          baseSrc="/banners/blogpage/blogsection/essentials.jpg"
        />
        <h1 className={styles["specific-blog__title"]}>
          Tea Brewing Essentials
        </h1>
      </div>
      <div className={styles["specific-blog__info"]}>
        <p className={cn(styles["specific-blog__intro"], "main-text")}>
          Tea brewing is a delicate process that enhances the flavors and aromas
          of each tea type. Whether you’re preparing Chinese tea, Japanese
          matcha, or Taiwanese oolong, understanding the correct brewing
          techniques ensures the best experience. In this guide, we will explore
          the universal principles of brewing tea and provide specific
          recommendations for different varieties
        </p>
        <div className={styles["specific-blog__green-pot-banner"]}>
          <Banner
            className="green-pot__banner"
            baseSrc="/banners/blogpage/blogsection/green-pot.jpg"
          />
        </div>
        <div className={styles["specific-blog__first-point"]}>
          <h3 className={styles["specific-blog__first-point-title"]}>
            1. Choosing the Right Water
          </h3>
          <p
            className={cn(
              styles["specific-blog__first-point-text"],
              "main-text"
            )}
          >
            The quality of water significantly affects the taste of tea. Always
            use fresh, filtered water with a neutral taste. Avoid distilled or
            overly hard water, as it can alter the flavor profile of the tea.
          </p>
        </div>
        <div className={styles["specific-blog__second-point"]}>
          <h3 className={styles["specific-blog__second-point-title"]}>
            2. Optimal Water Temperature
          </h3>
          <p
            className={cn(
              styles["specific-blog__second-point-text"],
              "main-text"
            )}
          >
            Different teas require different temperatures for optimal
            extraction:
          </p>

          <ul className={styles["specific-blog__second-point-list"]}>
            <li
              className={cn(
                "main-text",
                styles["specific-blog__second-point-item"]
              )}
            >
              Green tea: 70–80°C (158–176°F) to preserve delicate flavors and
              prevent bitterness.
            </li>
            <li
              className={cn(
                "main-text",
                styles["specific-blog__second-point-item"]
              )}
            >
              White tea: 75–85°C (167–185°F) to maintain its subtle floral
              notes.
            </li>
            <li
              className={cn(
                "main-text",
                styles["specific-blog__second-point-item"]
              )}
            >
              Oolong tea: 85–95°C (185–203°F) to bring out its complex aroma.
            </li>
            <li
              className={cn(
                "main-text",
                styles["specific-blog__second-point-item"]
              )}
            >
              Black tea: 90–100°C (194–212°F) to extract its bold and rich
              flavors.
            </li>
            <li
              className={cn(
                "main-text",
                styles["specific-blog__second-point-item"]
              )}
            >
              Pu-erh tea: 95–100°C (203–212°F) for deep fermentation notes.
            </li>
            <li
              className={cn(
                "main-text",
                styles["specific-blog__second-point-item"]
              )}
            >
              Herbal tea: 90–100°C (194–212°F) to fully release its essence.
            </li>
          </ul>
        </div>
        <div className={styles["specific-blog__three-cups-banner"]}>
          <Banner
            className="three-cups__banner"
            baseSrc="/banners/blogpage/blogsection/three-cups.jpg"
          />
        </div>
        <div className={styles["specific-blog__third-point"]}>
          <h3 className={styles["specific-blog__third-point-title"]}>
            3. Measuring the Right Amount of Tea
          </h3>
          <p
            className={cn(
              styles["specific-blog__third-point-text"],
              "main-text"
            )}
          >
            The quantity of tea leaves affects the strength of the brew. Here
            are general recommendations:
          </p>
          <ul className={styles["specific-blog__third-point-list"]}>
            <li
              className={cn(
                "main-text",
                styles["specific-blog__third-point-item"]
              )}
            >
              Loose-leaf tea: 2–3 grams per 150 ml of water.
            </li>
            <li
              className={cn(
                "main-text",
                styles["specific-blog__third-point-item"]
              )}
            >
              Compressed tea (e.g., Pu-erh cake): Break off 4–5 grams per 200
              ml.
            </li>
            <li
              className={cn(
                "main-text",
                styles["specific-blog__third-point-item"]
              )}
            >
              Matcha: 1–2 grams per 80 ml, whisked with hot water.
            </li>
          </ul>
        </div>
        <div className={styles["specific-blog__fourth-point"]}>
          <h3 className={styles["specific-blog__fourth-point-title"]}>
            4. Brewing Time
          </h3>
          <p
            className={cn(
              styles["specific-blog__fourth-point-text"],
              "main-text"
            )}
          >
            Steeping time plays a crucial role in achieving a balanced taste:
          </p>
          <ul className={styles["specific-blog__fourth-point-list"]}>
            <li
              className={cn(
                "main-text",
                styles["specific-blog__fourth-point-item"]
              )}
            >
              White tea: 2–4 minutes
            </li>
            <li
              className={cn(
                "main-text",
                styles["specific-blog__fourth-point-item"]
              )}
            >
              Oolong tea: 30 seconds – 3 minutes (multiple infusions possible)
            </li>
            <li
              className={cn(
                "main-text",
                styles["specific-blog__fourth-point-item"]
              )}
            >
              Black tea: 2–5 minutes
            </li>
            <li
              className={cn(
                "main-text",
                styles["specific-blog__fourth-point-item"]
              )}
            >
              Pu-erh tea: 10–30 seconds for the first brew, longer for
              subsequent infusions
            </li>
            <li
              className={cn(
                "main-text",
                styles["specific-blog__fourth-point-item"]
              )}
            >
              Herbal tea: 5–10 minutes, depending on ingredients{" "}
            </li>
          </ul>
          <p className={styles["specific-blog__fourth-point-text"]}>
            For some teas, like oolong and Pu-erh, multiple infusions enhance
            the flavor, evolving with each steeping.
          </p>
        </div>
        <div className={styles["specific-blog__holding-cup-banner"]}>
          <Banner
            className="holding-cup__banner"
            baseSrc="/banners/blogpage/blogsection/holding-cup.jpg"
          />
        </div>
        <div className={styles["specific-blog__fifth-point"]}>
          <h3 className={styles["specific-blog__fifth-point-title"]}>
            5. Choosing the Right Teaware
          </h3>
          <p className={styles["specific-blog__fifth-point-intro"]}>
            Using the right vessel contributes to the tea experience:
          </p>
          <ul
            className={cn(
              styles["specific-blog__fifth-point-list"],
              "main-text"
            )}
          >
            <li
              className={cn(
                "main-text",
                styles["specific-blog__fifth-point-list-item"]
              )}
            >
              Gaiwan (lidded cup): Best for oolong, Pu-erh, and delicate green
              teas.
            </li>
            <li
              className={cn(
                "main-text",
                styles["specific-blog__fifth-point-list-item"]
              )}
            >
              Teapot (Yixing clay or porcelain): Ideal for black and oolong
              teas, enhancing flavors over time.
            </li>
            <li
              className={cn(
                "main-text",
                styles["specific-blog__fifth-point-list-item"]
              )}
            >
              Glass teapot: Suitable for floral and herbal teas, allowing you to
              observe the infusion.
            </li>
            <li
              className={cn(
                "main-text",
                styles["specific-blog__fifth-point-list-item"]
              )}
            >
              Kyusu (Japanese teapot): Perfect for Japanese green teas like
              Sencha or Gyokuro.
            </li>
          </ul>
        </div>
        <div className={styles["specific-blog__sixth-point"]}>
          <h3 className={styles["specific-blog__sixth-point-title"]}>
            6. Enjoying the Tea
          </h3>
          <p
            className={cn(
              styles["specific-blog__sixth-point-text"],
              "main-text"
            )}
          >
            Once brewed, take a moment to appreciate the aroma before sipping.
            Allow the tea to cool slightly to experience its full flavor
            profile. For multiple infusions, adjust steeping time to release
            different layers of taste
          </p>
        </div>
        <div className={styles["specific-blog__conclusion"]}>
          <h3 className={styles["specific-blog__conclusion-title"]}>
            Conclusion
          </h3>
          <p
            className={cn(
              styles["specific-blog__conclusion-text"],
              "main-text"
            )}
          >
            Mastering tea brewing takes practice and patience, but following
            these universal guidelines will help you bring out the best in every
            cup. Experiment with different teas, water temperatures, and
            steeping times to find the perfect balance that suits your taste
            preferences. Happy brewing!
          </p>
        </div>
      </div>
    </section>
  );
};
