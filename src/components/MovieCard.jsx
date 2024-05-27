import React, { useState, useCallback, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    addToWatchlist,
    removeFromWatchlist,
    toggleWatched,
} from "../store/movieWatchListSlice";
import CheckIcon from "../svgs/CheckIcon";
import SaveIcon from "../svgs/SaveIcon";
import WatchListPopup from "./WatchListPopup";
import { useAuth } from "../context/AuthContext";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const MovieCard = React.memo(({ isWatchList, watchListName, movie }) => {
    const { Poster: poster, Title: name, imdbID: movieId, Year: year } = movie;

    const [openPopup, setOpenPopup] = useState(false);
    const [isNewWatchList, setIsNewWatchList] = useState(false);
    const [selectedWatchlistName, setSelectedWatchlistName] = useState("");
    const [selectedWatchListDescription, setSelectedWatchListDescription] =
        useState("");

    const { user, isLoggedIn } = useAuth();
    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const watchlists = useSelector((state) => state.movies.watchlists[user]);
    const watchlistNames = useMemo(
        () => watchlists?.map((watchlist) => watchlist.name),
        [watchlists]
    );
    const isMovieInWatchlist = useMemo(
        () =>
            watchlists
                ?.flatMap((watchlist) => watchlist.movies)
                .some((movie) => movie?.movieId === movieId),
        [watchlists, movieId]
    );

    const currentWatchList = useMemo(
        () => watchlists?.find((watchlist) => watchlist.name === watchListName),
        [watchlists, watchListName]
    );
    const isMovieWatched = useMemo(
        () =>
            currentWatchList?.movies.find((movie) => movie.movieId === movieId)
                ?.watched,
        [currentWatchList, movieId]
    );

    const handleClosePopUp = useCallback(() => {
        setOpenPopup(false);
    }, []);

    const handleSaveWatchList = useCallback(() => {
        dispatch(
            addToWatchlist({
                userId: user,
                movieId,
                watchlistName: selectedWatchlistName,
                ...(isNewWatchList
                    ? { watchlistDescription: selectedWatchListDescription }
                    : {}),
            })
        );
        setOpenPopup(false);
        toast.success("Movie added into the watchlist!");
    }, [
        dispatch,
        isNewWatchList,
        selectedWatchlistName,
        selectedWatchListDescription,
        user,
        movieId,
    ]);

    const handleWatchlist = useCallback(() => {
        if (isLoggedIn()) {
            if (isMovieInWatchlist) {
                dispatch(removeFromWatchlist({ userId: user, movieId }));
                toast.success("Movie removed from the watchlist!");
            } else {
                setOpenPopup(true);
            }
        } else {
            const searchParams = new URLSearchParams(location.search);
            navigate(`/login?${searchParams.toString()}`);
            toast.info("Login to create your watchlists.");
        }
    }, [
        dispatch,
        isMovieInWatchlist,
        isLoggedIn,
        location.search,
        navigate,
        user,
        movieId,
    ]);

    const handleWatched = useCallback(() => {
        dispatch(
            toggleWatched({
                userId: user,
                movieId,
                watchListName,
            })
        );
        toast.success("Movie watch option has been updated!");
    }, [dispatch, user, movieId, watchListName]);

    return (
        <div className="w-[85%] max-w-60 md:w-44 h-[395px] rounded-lg overflow-hidden shadow-xl transition-transform hover:scale-105 mb-8 md:mb-0">
            <div className="relative">
                <img
                    src={poster}
                    className="bg-cover w-full h-[280px] md:h-[240px]"
                    alt={`${name} movie`}
                />
                {isWatchList ? (
                    <div className="absolute top-2 right-2 cursor-pointer">
                        <CheckIcon
                            onClick={handleWatched}
                            isMovieWatched={isMovieWatched}
                        />
                    </div>
                ) : (
                    <div className="absolute top-0 left-[calc(-7px)] cursor-pointer">
                        <SaveIcon
                            onClick={handleWatchlist}
                            isMovieInWatchlist={isMovieInWatchlist}
                        />
                    </div>
                )}
            </div>
            <div className="px-4 pt-2">
                <p className="text-gray-700 text-base text-right">93/100</p>
                <div className="font-semibold font-sans text-l mt-1">
                    {name}
                </div>
                <p>({year})</p>
            </div>
            <WatchListPopup
                openPopUp={openPopup}
                closePopUp={handleClosePopUp}
                onSave={handleSaveWatchList}
                watchlists={watchlistNames}
                setIsNewWatchList={setIsNewWatchList}
                setSelectedWatchlistName={setSelectedWatchlistName}
                setSelectedWatchListDescription={
                    setSelectedWatchListDescription
                }
            />
        </div>
    );
});

export default MovieCard;
