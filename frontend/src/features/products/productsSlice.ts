import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Product } from "../../types/Product";

export const productsSlice = createSlice({
  name: "products",
  initialState: {
    products: [] as Product[],
    chosenProduct: {} as Product,
    likedProducts: JSON.parse(
      localStorage.getItem("likedProducts") || "[]"
    ) as Product[],
    currentPage: Number(sessionStorage.getItem("page")) || 1,
    productsPerPage: 8,
    isProductsLoaded: false,
  },

  reducers: {
    updateProducts(state, action: PayloadAction<Product[]>) {
      state.products = action.payload;
    },

    updateChosenProduct(state, action: PayloadAction<Product>) {
      state.chosenProduct = action.payload;
    },

    updateLikedProducts(state, action: PayloadAction<Product[]>) {
      state.likedProducts = action.payload;
    },

    updateCurrentPage(state, action: PayloadAction<number>) {
      state.currentPage = action.payload;
    },

    updateProductsPerPage(state, action: PayloadAction<8 | 9>) {
      state.productsPerPage = action.payload;
    },

    updateIsProductsLoaded(state, action: PayloadAction<boolean>) {
      state.isProductsLoaded = action.payload;
    }
  },
});

export default productsSlice.reducer;

export const {
  updateChosenProduct,
  updateProducts,
  updateLikedProducts,
  updateCurrentPage,
  updateProductsPerPage,
  updateIsProductsLoaded,
} = productsSlice.actions;

export const productsActions = productsSlice.actions; // to destructure actions inside heavy components
