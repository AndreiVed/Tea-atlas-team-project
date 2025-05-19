import { screenEndpoints } from "@/constants/endpoints";
import { FC } from "react";
import styles from "./Banner.module.scss";

type Device = "mobile" | "tablet" | "desktop";

type Props = {
  className: string;
  baseSrc: string;
};

export const Banner: FC<Props> = ({ className, baseSrc }) => {
  const { desktop, tablet } = screenEndpoints;

  const insertImageSrc = (device: Device) => {
    const imageFormatIndex = baseSrc.indexOf(".");
    const srcWithoutFormat = baseSrc.slice(0, imageFormatIndex);
    const format = baseSrc.slice(imageFormatIndex);

    return `${srcWithoutFormat}-${device}${format}`;
  };

  return (
    <div className={styles[className]}>
      <picture>
        <source
          srcSet={insertImageSrc("desktop")}
          media={`(min-width: ${desktop}px`}
        />
        <source
          srcSet={insertImageSrc("tablet")}
          media={`(min-width: ${tablet}px`}
        />
        <img
          className={styles[className]}
          src={insertImageSrc("mobile")}
          alt="Discover world of tea banner"
        />
      </picture>
    </div>
  );
};
