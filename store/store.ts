import { configureStore } from "@reduxjs/toolkit";
import scrollReducer from "@/features/scrollSlice/scrollSlice";
import orderReducer from "@/features/orderSlice/orderSlice";
import newOrderReducer from "@/features/orderSlice/newOrderSlice";

const store = configureStore({
  reducer: {
    scroll: scrollReducer,
    order: orderReducer,
    newOrder: newOrderReducer,
  },
});

export default store;
