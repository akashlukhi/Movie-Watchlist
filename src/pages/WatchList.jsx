import { useEffect, useState, useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";
import EditIcon from "../svgs/EditIcon";
import { useDispatch, useSelector } from "react-redux";
import { useAuth } from "../context/AuthContext";
import axios from "axios";
import Loading from "../components/Loading";
import EditWatchListPopup from "../components/EditWatchListPopup";
import { updateWatchlistMetadata } from "../store/movieWatchListSlice";
import { toast } from "react-toastify";
import MovieCard from "../components/MovieCard";

const API_KEY = process.env.REACT_APP_API_KEY;

const WatchList = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { user, isLoggedIn } = useAuth();
    const { watchlist } = useParams();
    const watchListData = useSelector((state) => state.movies.watchlists[user]);
    const watchListName = decodeURIComponent(watchlist);
    const currentWatchlist = watchListData?.find(
        (watchlists) => watchlists.name === watchListName
    );
    const [movies, setMovies] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    const [openPopup, setOpenPopup] = useState(false);
    const [watchlistMetaData, setWatchlistMetaData] = useState({
        name: "",
        description: "",
    });

    const handleClosePopup = () => setOpenPopup(false);

    const fetchMovies = useCallback(async () => {
        try {
            setIsLoading(true);
            const watchListMovies = currentWatchlist?.movies;
            const promises = watchListMovies?.map(async (movie) => {
                const response = await axios.get(
                    `https://www.omdbapi.com/?apikey=${API_KEY}&i=${movie.movieId}`
                );
                return response.data;
            });
            const results = await Promise.all(promises);
            setMovies(results);
        } catch (error) {
            setIsError(true);
            toast.error("Something went wrong!");
            console.error("Error fetching data:", error);
        } finally {
            setIsLoading(false);
        }
    }, [currentWatchlist?.movies]);

    useEffect(() => {
        if (isLoggedIn()) {
            fetchMovies();
        }
    }, [fetchMovies, isLoggedIn]);

    const onSave = () => {
        dispatch(
            updateWatchlistMetadata({
                userId: user,
                watchlistName: watchListName,
                newName: watchlistMetaData.name,
                newDescription: watchlistMetaData.description,
            })
        );
        setOpenPopup(false);
        toast.success("Watchlist updated!");
        navigate(`/watchlist/${watchlistMetaData.name}`);
    };

    if (!isLoggedIn()) {
        navigate("/login");
        toast.info("Login to create your watchlists.");
        return null;
    }

    return (
        <div className="w-full mx-16 mt-8 flex flex-col flex-grow">
            <div id="watchlist-header">
                <h2 className="text-[2.5rem] font-semibold flex gap-5 items-center">
                    {watchListName}{" "}
                    <EditIcon onClick={() => setOpenPopup(true)} />
                </h2>
                <h4 className="font-md text-[1.3rem] font-medium mt-4">
                    About this watchlist
                </h4>
                <p>{currentWatchlist?.description}</p>
            </div>
            <div id="movies">
                {isLoading ? (
                    <Loading />
                ) : isError ? (
                    <p className="flex flex-wrap justify-center items-center h-full font-semibold text-red-500">
                        Something went wrong! Please try again later.
                    </p>
                ) : (
                    <div
                        id="movie-list"
                        className="flex flex-wrap justify-center gap-8 md:justify-start md:gap-10 mt-10 m-auto"
                    >
                        {movies && movies.length ? (
                            movies.map((movie) => (
                                <MovieCard
                                    movie={movie}
                                    key={movie.imdbID}
                                    isWatchList={true}
                                    watchListName={watchListName}
                                />
                            ))
                        ) : (
                            <p className="font-semibold">No Movies Added!</p>
                        )}
                    </div>
                )}
            </div>
            <EditWatchListPopup
                name={watchListName}
                description={currentWatchlist?.description}
                openPopUp={openPopup}
                closePopUp={handleClosePopup}
                setWatchlistMetaData={setWatchlistMetaData}
                onSave={onSave}
            />
        </div>
    );
};

export default WatchList;
