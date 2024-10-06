import { create } from "zustand";

const filterStore = (set, get) => ({
  filters: {},  // Using an object to store filters

  // Adds a filter with a unique key
  addFilter: (key, filter) => {
    set((state) => ({
      filters: { ...state.filters, [key]: filter },
    }));
  },

  // Removes a filter by key
  removeFilter: (key) => {
    set((state) => {
      const { [key]: _, ...remainingFilters } = state.filters;
      return { filters: remainingFilters };
    });
  },

  // Resets all filters
  resetFilters: () => {
    set({ filters: {} });
  },
});

const useFilterStore = create(filterStore);

export default useFilterStore;
