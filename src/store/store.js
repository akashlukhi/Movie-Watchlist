import { configureStore } from "@reduxjs/toolkit";
import movieWatchListSlice from "./movieWatchListSlice";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
    key: "root",
    storage,
};

const persistedMovieWatchListReducer = persistReducer(
    persistConfig,
    movieWatchListSlice
);

const store = configureStore({
    reducer: {
        movies: persistedMovieWatchListReducer,
    },
});

export const persistor = persistStore(store);

export default store;
