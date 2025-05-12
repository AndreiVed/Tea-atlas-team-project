import cn from "classnames";
import { FC } from "react";
import { steepingInstructions } from "../../config";
import styles from "./SteepingInstructions.module.scss";

export const SteepingInstructions: FC = () => {
  return (
    <div className={styles["steeping-instructions"]}>
      <p className={cn(styles["steeping-instructions__title"], "large-text")}>
        Steeping instructions
      </p>
      <div className={styles["steeping-instructions__content"]}>
        {steepingInstructions.map((instruction) => {
          const { title, img, desc } = instruction;

          return (
            <div
              key={Math.random()}
              className={styles["steeping-instructions__instruction"]}
            >
              <img
                className={styles["steeping-instructions__instruction-photo"]}
                src={img}
                alt={title}
              />
              <p
                className={cn(
                  styles["steeping-instructions__instruction-title"],
                  "small-text"
                )}
              >
                {title}
              </p>
              <p
                className={cn(
                  styles["steeping-instructions__instruction-desc"],
                  "main-text"
                )}
              >
                {desc}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};
