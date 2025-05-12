import cn from "classnames";
import { FC } from "react";
import { Badge } from "../Badge";
import styles from "./ProductCharacteristic.module.scss";

type Props = {
  title: string;
  badges: string[];
  index: number;
};

export const ProductCharacteristic: FC<Props> = ({ title, badges, index }) => {
  const isFirst = index === 0;

  return (
    <div
      className={cn(styles["product-characteristics"], {
        [styles["product-characteristics--first"]]: isFirst,
      })}
    >
      <p className={cn(styles["product-characteristics__title"], "large-text")}>
        {title}
      </p>
      <div className={styles["product-characteristics__badges"]}>
        {badges.map((badge) => (
          <Badge key={Math.random()} text={badge} />
        ))}
      </div>
    </div>
  );
};
