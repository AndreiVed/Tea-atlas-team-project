// used on product page, because response object has different structure
import { Product } from "./Product";
import { ProductCategoryExtended } from "./ProductCategory";

type ProductOverrides = {
  category: ProductCategoryExtended;
  description: string;
  impact: string;
};

// take all changed keys and overwrite them with extended version
export type ProductExtended = Omit<Product, keyof ProductOverrides> &
  ProductOverrides;
