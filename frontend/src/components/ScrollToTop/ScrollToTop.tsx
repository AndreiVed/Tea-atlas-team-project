import cn from "classnames";
import { FC, useCallback, useEffect, useRef, useState } from "react";
import { useCursorEffect } from "../../hooks/useCursorEffect";
import styles from "./ScrollToTop.module.scss";

export const ScrollToTop: FC = () => {
  const { handleMouseEnter, handleMouseLeave } = useCursorEffect();
  const [isActive, setIsActive] = useState(false);
  const [isFixed, setIsFixed] = useState(false);
  const scrollToTopRef = useRef<HTMLDivElement>(null);
  // const [marginBetween, setMarginBetween] = useState(16);

  useEffect(() => {
    if (!scrollToTopRef.current) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.boundingClientRect.top <= window.innerHeight - 200) {
          setIsFixed(true);
        } else {
          setIsFixed(false);
        }
      },
      { root: null, threshold: 0 }
    );

    observer.observe(scrollToTopRef.current);

    return () => observer.disconnect();
  }, [scrollToTopRef]);

  const checkScroll = useCallback(() => {
    const scrollY = window.scrollY || document.documentElement.scrollTop;
    const viewportHeight = window.innerHeight;
    setIsActive(scrollY > viewportHeight);
  }, []);

  useEffect(() => {
    checkScroll();

    window.addEventListener("scroll", checkScroll);
    window.addEventListener("resize", checkScroll);

    return () => {
      window.removeEventListener("scroll", checkScroll);
      window.removeEventListener("resize", checkScroll);
    };
  }, [checkScroll]);

  return (
    <div
      className={cn(styles["scroll-to-top"], {
        [styles["scroll-to-top--active"]]: isActive,
        [styles["scroll-to-top--fixed"]]: isFixed,
      })}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      ref={scrollToTopRef}
    >
      <img
        className={styles["scroll-to-top__logo"]}
        src="/icons/page-arrow-up.svg"
        alt="Go up"
        aria-label="Go up"
      />
    </div>
  );
};
