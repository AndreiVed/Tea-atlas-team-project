import { FC } from "react";
import { ProductCategoryExtended } from "../../../../types/ProductCategory";
import { ProductCharacteristic } from "../ProductCharacteristic/ProductCharacteristic";
import styles from "./ProductCharacteristics.module.scss";

type Props = {
  category: ProductCategoryExtended;
  impact: string;
  descriptors: string[];
};

export const ProductCharacteristics: FC<Props> = ({
  category,
  impact,
  descriptors,
}) => {
  const { fermentation, region } = category;

  const { country, province } = region;

  const characteristics = [
    {
      title: "Country",
      badges: [`${country} · ${province}`],
    },
    {
      title: "Impact",
      badges: [impact],
    },
    {
      title: "Fermentation",
      badges: [fermentation],
    },
    {
      title: "Tasting notes",
      badges: descriptors,
    },
  ];
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
