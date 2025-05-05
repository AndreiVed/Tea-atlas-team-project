import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { cloneDeep } from 'lodash-es';
import { selectedFiltersDefaults } from "../../constants/formsInitials";
import { screenEndpoints } from "../../endpoints";
import { SelectedFilters } from "../../types/SelectedFilters";

export const filterSlice = createSlice({
  name: "filter",
  initialState: {
    isFilterOpened: false,
    selectedFilters: selectedFiltersDefaults,
    submittedFilters: cloneDeep(selectedFiltersDefaults),
  },
  reducers: {
    updateIsFilterOpened(state, action: PayloadAction<boolean>) {
      if (state.isFilterOpened && window.innerWidth > screenEndpoints.desktop) {
        return;
      }

      state.isFilterOpened = action.payload;
    },

    updateSelectedFilters(state, action: PayloadAction<SelectedFilters>) {
      state.selectedFilters = action.payload;
    },

    updateSubmittedFilters(state, action: PayloadAction<SelectedFilters>) {
      state.submittedFilters = action.payload;
    },
  },
});

export const {
  updateIsFilterOpened,
  updateSelectedFilters,
  updateSubmittedFilters,
} = filterSlice.actions;

export default filterSlice.reducer;
