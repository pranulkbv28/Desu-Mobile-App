import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface OrderState {
  restaurantId: string | null;
  orderDetails: any[];
}

const initialState: OrderState = {
  restaurantId: null,
  orderDetails: [],
};

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    setOrder: (
      state,
      action: PayloadAction<{ restaurantId: string; orderDetails: any[] }>
    ) => {
      state.restaurantId = action.payload.restaurantId;
      state.orderDetails = action.payload.orderDetails;
    },
    addItemToOrder: (state, action: PayloadAction<any>) => {
      const newOrderDetails = state.orderDetails.filter(
        (item) => item.dish.name !== action.payload.dish.name
      );
      newOrderDetails.push(action.payload);
      state.orderDetails = newOrderDetails;
    },
    removeItemFromOrder: (state, action: PayloadAction<number>) => {
      state.orderDetails = state.orderDetails.filter(
        (item) => item.dish.id !== action.payload
      );
    },
  },
});

export const { setOrder, addItemToOrder, removeItemFromOrder } =
  orderSlice.actions;
export default orderSlice.reducer;
