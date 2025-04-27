import { API_ENDPOINTS } from "../endpoints";
import { updateProducts } from "../features/products/productsSlice";
import { AppDispatch } from "../store/appStore";

export const loadAllProducts = (dispatch: AppDispatch) => {
  fetch(API_ENDPOINTS.catalog.loadProducts)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Something went wrong.");
      } else {
        return response.json();
      }
    })
    .then((data) => {
      dispatch(updateProducts(data));
    });
};
