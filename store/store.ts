import { configureStore } from "@reduxjs/toolkit";
import scrollReducer from "@/features/scrollSlice/scrollSlice";

const store = configureStore({
  reducer: {
    scroll: scrollReducer,
  },
});

export default store;
