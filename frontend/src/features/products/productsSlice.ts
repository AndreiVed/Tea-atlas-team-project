import { createSlice } from "@reduxjs/toolkit";
import { Product } from "../../types/Product";

export const productsSlice = createSlice({
  name: "products",
  initialState: {
    products: [] as Product[],
    error: '',
  },
  
  reducers: {
    setProducts(state, action) {
      state.products = action.payload;
    },

    setError(state, action) {
      state.error = action.payload;
    }
  }
});

export default productsSlice.reducer;

export const { setProducts, setError } = productsSlice.actions;