import { Banner } from "@/components/Banner";
import { useScroll } from "@/hooks/useScroll";
import cn from "classnames";
import { FC } from "react";
import styles from "./BlogPage.module.scss";
import { BlogSection } from "./components/BlogSection";

export const BlogPage: FC = () => {
  useScroll({options: {top: 0, behavior: "instant"}});

  return (
    <section className={styles["blog"]}>
      <div className={cn(styles["blog__banner"], styles["blog-banner-wrap"])}>
        <Banner className="blog__banner" baseSrc="/banners/blogpage/blog.jpg" />
        <h1 className={styles["blog__banner-title"]}>Blog</h1>
      </div>
      <div className={styles["blog__sections"]}>
        <BlogSection />
      </div>
    </section>
  );
};
