import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { screenEndpoints } from "../../endpoints";
import { SelectedFilters } from "../../types/SelectedFilters";

export const filterSlice = createSlice({
  name: "filter",
  initialState: {
    isFilterOpened: false,
    searchParams: "",
    selectedFilters: {
      country: [],
      impact: [],
      fermentation: [],
    } as SelectedFilters,
  },
  reducers: {
    setIsFilterOpened(state, action) {
      if (state.isFilterOpened && window.innerWidth > screenEndpoints.desktop) {
        return;
      }

      state.isFilterOpened = action.payload;
    },

    setSelectedFilters(state, action) {
      state.selectedFilters = action.payload;
    },

    setSearchParams(state, action: PayloadAction<string>) {
      state.searchParams = action.payload.toString();
    },
  },
});

export const { setIsFilterOpened, setSelectedFilters, setSearchParams } =
  filterSlice.actions;

export default filterSlice.reducer;
