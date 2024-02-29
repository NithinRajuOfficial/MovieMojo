import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  info: null,
};

export const tvSlice = createSlice({
  name: "tv",
  initialState,
  reducers: {
    loadTvData: (state, action) => {
      state.into = action.payload;
    },
    removeTvData: (state) => {
      state.info = null;
    },
  },
});

export const { loadTvData, removeTvData } = tvSlice.actions;
export default tvSlice.reducer;
