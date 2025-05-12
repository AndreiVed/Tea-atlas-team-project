import { SelectedFilters } from "../types/SelectedFilters";

export const createFormattedParams = (filters: SelectedFilters) => {
  const params = new URLSearchParams();

  Object.entries(filters).forEach(([key, values]) => {
    if (Array.isArray(values) && values.length > 0) {
      params.set(key, values.join(","));
    }
  });

  return params;
};
