import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  info: null,
};

export const personSlice = createSlice({
  name: "person",
  initialState,
  reducers: {
    loadPersonData: (state, action) => {
      state.info = action.payload;
    },
    removePersonData: (state) => {
      state.info = null;
    },
  },
});

export const { loadPersonData, removePersonData } = personSlice.actions;
export default personSlice.reducer;
