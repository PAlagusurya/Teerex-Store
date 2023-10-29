import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ProductDetail } from "../models/model";

type CartState = {
  items: ProductDetail[];
};

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
  } as CartState,
  reducers: {
    addItem: (state, action: PayloadAction<ProductDetail>) => {
      state.items.push(action.payload);
    },
    removeItem: (state, action: PayloadAction<number>) => {
      const itemId = action.payload;
      state.items = state.items.filter((item) => item.id !== itemId);
    },
    updateItem: (
      state,
      action: PayloadAction<{
        id: number;
        quantityCount: number;
        property: string;
      }>
    ) => {
      const { id, quantityCount, property } = action.payload;

      const itemIndex = state.items.findIndex((item) => item.id === id);

      if (itemIndex !== -1) {
        state.items[itemIndex][property] = quantityCount;
      }
    },
  },
});

export const { addItem, removeItem, updateItem } = cartSlice.actions;
export default cartSlice.reducer;
