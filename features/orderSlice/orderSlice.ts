import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  orderDetails: {
    restaurantId: "",
    restaurantName: "",
    orders: [] as any[],
  },
};

const orderSlice = createSlice({
  name: "orderDetails",
  initialState,
  reducers: {
    setOrderDetails: (state, action) => {
      return {
        ...state,
        orderDetails: {
          restaurantId: action.payload.restaurantId,
          restaurantName: action.payload.restaurantName,
          orders: [...action.payload.orders], // Ensuring new array for immutability
        },
      };
    },
  },
});

export const { setOrderDetails } = orderSlice.actions;
export default orderSlice.reducer;
