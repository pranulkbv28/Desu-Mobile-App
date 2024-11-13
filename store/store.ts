import { configureStore } from "@reduxjs/toolkit";
import scrollReducer from "@/features/scrollSlice/scrollSlice";
import orderReducer from "@/features/orderSlice/orderSlice";

const store = configureStore({
  reducer: {
    scroll: scrollReducer,
    order: orderReducer,
  },
});

export default store;
