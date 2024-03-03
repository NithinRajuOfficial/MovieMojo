import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  open: false,
};

export const SideBarSlice = createSlice({
  name: "SideBar",
  initialState,
  reducers: {
    isSideBar: (state, action) => {
      console.log("came",action,state)
      state.open = action.payload;
    },
    removeSideBar: (state) => {
      state.open = false;
    },
  },
});

export const { isSideBar, removeSideBar } = SideBarSlice.actions;
export default SideBarSlice.reducer;
