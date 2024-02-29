import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  info: null,
};

export const movieSlice = createSlice({
  name: "movie",
  initialState,
  reducers: {
    loadMovieData: (state, action) => {
      state.info = action.payload;
    },
    removeMovieData: (state) => {
      state.info = null;
    },
  },
});

export const { loadMovieData, removeMovieData } = movieSlice.actions;
export default movieSlice.reducer;
