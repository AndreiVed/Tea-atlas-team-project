import { ProductCategoryExtended } from "@/types/ProductCategory";
import { FC } from "react";
import { ProductCharacteristic } from "../ProductCharacteristic";
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
      id: 1,
      title: "Country",
      badges: [`${country} · ${province}`],
    },
    {
      id: 2,
      title: "Impact",
      badges: [impact],
    },
    {
      id: 3,
      title: "Fermentation",
      badges: [fermentation],
    },
    {
      id: 4,
      title: "Tasting notes",
      badges: descriptors,
    },
  ];

  return (
    <div className={styles["product__characteristics"]}>
      {characteristics.map((characteristic, index) => {
        const { id, title, badges } = characteristic;

        return (
          <ProductCharacteristic
            key={id}
            title={title}
            badges={badges}
            index={index}
          />
        );
      })}
    </div>
  );
};
