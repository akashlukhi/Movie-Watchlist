import { configureStore } from "@reduxjs/toolkit";
import movieWatchListSlice from "./movieWatchListSlice";

const store = configureStore({
    reducer: {
        movies: movieWatchListSlice,
    },
});

export default store;
