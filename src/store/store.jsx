import { configureStore } from "@reduxjs/toolkit";
import movieSlice from "./reducers/movieSlice";
import personSlice from "./reducers/personSlice";
import SidebarSlice from "./reducers/SidebarSlice";

export const store = configureStore({
  reducer: {
    movie: movieSlice,
    sideBar: SidebarSlice,
    person: personSlice,
  },
});
