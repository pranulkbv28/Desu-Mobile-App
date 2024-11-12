import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isScrolling: false,
};

const scrollSlice = createSlice({
  name: "isScrolling",
  initialState,
  reducers: {
    setIsScrolling: (state, action) => {
      state.isScrolling = action.payload;
    },
  },
});

export const { setIsScrolling } = scrollSlice.actions;
export default scrollSlice.reducer;
