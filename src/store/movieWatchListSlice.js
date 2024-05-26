import { createSlice } from "@reduxjs/toolkit";

const movieWatchListSlice = createSlice({
    name: "movie",
    initialState: {
        watchlists: {},
    },
    reducers: {
        createUser(state, action) {
            const { userId } = action.payload;
            if (!state.watchlists[userId]) {
                state.watchlists[userId] = []; // Initialize an empty array for the new user
            }
        },
        deleteUser(state, action) {
            const { userId } = action.payload;
            delete state.watchlists[userId]; // Remove the user's watchlists
        },
        updateWatchlistMetadata(state, action) {
            const { userId, watchlistName, newName, newDescription } =
                action.payload;
            // Find the watchlist for the specified user and watchlistName
            const userWatchlist = state.watchlists[userId]?.find(
                (watchlist) => watchlist.name === watchlistName
            );
            // If the watchlist exists, update its metadata
            if (userWatchlist) {
                userWatchlist.name = newName;
                userWatchlist.description = newDescription;
            }
        },
        addToWatchlist(state, action) {
            const { userId, movieId, watchlistName, watchlistDescription } =
                action.payload;
            // Find the watchlist for the specified user and watchlistName
            const userWatchlist = state.watchlists[userId].find(
                (watchlist) => watchlist.name === watchlistName
            );
            // If the watchlist exists, add the movie to it; otherwise, create a new watchlist
            if (userWatchlist) {
                userWatchlist.movies.push({ movieId, watched: false });
            } else {
                state.watchlists[userId].push({
                    name: watchlistName,
                    description: watchlistDescription,
                    movies: [{ movieId, watched: false }],
                });
            }
        },
        removeFromWatchlist(state, action) {
            const { userId, movieId } = action.payload;
            // Iterate through all watchlists of the user to find and remove the movie
            state.watchlists[userId].forEach((watchlist) => {
                watchlist.movies = watchlist.movies.filter(
                    (movie) => movie.movieId !== movieId
                );
            });
        },
        toggleWatched(state, action) {
            const { userId, movieId, watchListName } = action.payload;
            // Find the watchlist for the specified user and watchlistName
            const userWatchlist = state.watchlists[userId].find(
                (watchlist) => watchlist.name === watchListName
            );
            // Toggle the watched status of the movie
            if (userWatchlist) {
                const movieToUpdate = userWatchlist.movies.find(
                    (movie) => movie.movieId === movieId
                );
                if (movieToUpdate) {
                    movieToUpdate.watched = !movieToUpdate.watched;
                }
            }
        },
    },
});

export const {
    createUser,
    deleteUser,
    updateWatchlistMetadata,
    addToWatchlist,
    removeFromWatchlist,
    toggleWatched,
} = movieWatchListSlice.actions;

export default movieWatchListSlice.reducer;
