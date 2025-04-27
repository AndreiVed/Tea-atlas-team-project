import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Product } from "../../types/Product";

export const productsSlice = createSlice({
  name: "products",
  initialState: {
    products: [] as Product[],
    chosenProduct: {} as Product,
  },

  reducers: {
    updateProducts(state, action) {
      state.products = action.payload;
    },

    updateChosenProduct(state, action: PayloadAction<Product>) {
      state.chosenProduct = action.payload;
    },
  },
});

export default productsSlice.reducer;

export const { updateChosenProduct, updateProducts } = productsSlice.actions;
