import cn from "classnames";
import { FC } from "react";
import styles from "./Loader.module.scss";

interface Props {
  size?: "small" | "big";
}

export const Loader: FC<Props> = ({ size }) => (
  <span
    className={cn(styles["loader"], {
      [styles["loader--big"]]: size === "big",
    })}
  />
);
