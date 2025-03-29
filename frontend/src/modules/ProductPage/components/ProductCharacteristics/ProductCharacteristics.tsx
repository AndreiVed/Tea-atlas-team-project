import { FC } from "react";
import { characteristics } from "../../../../constants/product";
import { ProductCharacteristic } from "../ProductCharacteristic/ProductCharacteristic";
import styles from "./ProductCharacteristics.module.scss";

export const ProductCharacteristics: FC = () => {
  return (
    <div className={styles["product__characteristics"]}>
      {characteristics.map((characteristic, index) => {
        const { title, badges } = characteristic;

        return (
          <ProductCharacteristic
            key={Math.random() * index}
            title={title}
            badges={badges}
            index={index}
          />
        );
      })}
    </div>
  );
};
