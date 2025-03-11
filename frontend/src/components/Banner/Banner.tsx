import { FC } from "react";
import { desktopWidth, tabletWidth } from "../../config";
import styles from "./Banner.module.scss";

type Device = "mobile" | "tablet" | "desktop";

type Props = {
  className: string;
  baseSrc: string;
};

/*
baseSrc doesn't belong to any actual picture's url,
it is used to append device type in the end,
check public folder for reference.

Example:
actual url '/banners/homepage/banner-mobile.jpg,
baseSrc: '/banners/homepage/banner.jpg''
*/

export const Banner: FC<Props> = ({ className, baseSrc }) => {
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
          media={`(min-width: ${desktopWidth}px`}
        />
        <source
          srcSet={insertImageSrc("tablet")}
          media={`(min-width: ${tabletWidth}px`}
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
