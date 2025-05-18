import { useNavigate } from "react-router-dom";
import { API_ENDPOINTS } from "../constants/endpoints";
import { updateSubmittedFilters } from "../features/filter/filterSlice";
import { updateIsProductsLoaded, updateProducts } from "../features/products/productsSlice";
import { createFormattedParams } from "../handlers/createFormattedParams";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { SelectedFilters } from "../types/SelectedFilters";


export const useLoadSelectedProducts = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { selectedFilters } = useAppSelector((state) => state.filter);

  const loadSelectedProducts = (filters: SelectedFilters) => {
    const params = createFormattedParams(filters);
    const stringParams = params.toString();
  
    fetch(API_ENDPOINTS.catalog.applyFilters(stringParams))
      .then((response) => {
        dispatch(updateIsProductsLoaded(false));
        if (!response.ok) {
          throw new Error("Something went wrong.");
        }
  
        return response.json();
      })
      .then((data) => {
        dispatch(updateProducts(data));
        dispatch(updateSubmittedFilters(selectedFilters));
        navigate(`/catalog?${stringParams}`);
        window.scrollTo({ top: 0, behavior: "smooth" });
      }).finally(() => {
        dispatch(updateIsProductsLoaded(true));
      });
  }

    return { loadSelectedProducts };
};
