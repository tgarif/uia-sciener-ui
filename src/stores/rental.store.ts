import { Rental } from '@interfaces/sciener.interface';
import { defineStore } from 'pinia';

export const rentalStore = defineStore('rental', {
  state: () => ({
    data: {} as Rental,
  }),
  getters: {
    getRentalData: (state) => state.data,
    hasRentalData: (state) =>
      state.data.constructor === Object &&
      Object.entries(state.data).length > 0,
  },
  actions: {
    setRentalData(data: Rental) {
      this.data = data;
    },
    removeRentalData() {
      this.data = {} as Rental;
    },
  },
});
