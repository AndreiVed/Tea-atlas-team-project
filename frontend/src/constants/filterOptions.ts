import { FilterOption } from "../types/FilterOption";

export const countriesOptions: FilterOption[] = [
  { id: 1, title: "China", value: "china" },
  { id: 2, title: "Taiwan", value: "taiwan" },
  { id: 3, title: "Thailand", value: "thailand" },
  { id: 4, title: "Japan", value: "japan" },
  { id: 5, title: "Vietnam", value: "vietnam" },
];

export const impactOptions: FilterOption[] = [
  { id: 6, title: "Warming", value: "warming" },
  { id: 7, title: "Cooling", value: "cooling" },
  { id: 8, title: "Balancing", value: "balancing" },
  { id: 9, title: "Nourishing", value: "nourishing" },
  { id: 10, title: "Detoxifying", value: "detoxifying" },
  { id: 11, title: "Aids Digestion", value: "aids digestion" },
];

export const fermentationOptions: FilterOption[] = [
  { id: 12, title: "Minimally Oxidized", value: "minimally oxidized" },
  { id: 13, title: "Lightly Oxidized", value: "lightly oxidized" },
  { id: 14, title: "Partially Oxidized", value: "partially oxidized" },
  { id: 15, title: "Fully Oxidized", value: "fully oxidized" },
  { id: 16, title: "Post-Fermented", value: "post-fermented" },
];

export const typeOptions: FilterOption[] = [
  { id: 17, title: "Pu-erh", value: "pu-erh" },
  { id: 18, title: "White", value: "white"},
  { id: 19, title: "Oolong", value: "oolong" },
];

export const filterOptions = {
  countries: countriesOptions,
  impact: impactOptions,
  fermentation: fermentationOptions,
  type: typeOptions,
};