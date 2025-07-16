import { Banner } from "@/components/Banner";
import { GeneralButton } from "@/components/GeneralButton/GeneralButton";
import cn from "classnames";
import { FC } from "react";
import styles from "./BlogSection.module.scss";

export const BlogSection: FC = () => {
  return (
    <section className={styles["blog-section"]}>
      <Banner
        className="blog-section"
        baseSrc="/banners/blogpage/blogsection/essentials.webp"
      />
      <div className={styles["blog-section__info"]}>
        <h2 className={styles["blog-section__info-title"]}>
          Tea Brewing Essentials
        </h2>
        <p className={cn(styles["blog-section__info-desc"], "main-text")}>
          Tea brewing is a delicate process that enhances the flavors and aromas
          of each tea type...
        </p>
        <div className={styles["blog-section__info-btn-wrap"]}>
          <GeneralButton
            type="secondary"
            text="READ MORE"
            to="/blog/tea-brewing-essentials"
          />
        </div>
      </div>
    </section>
  );
};
