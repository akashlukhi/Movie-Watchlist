import React, { useCallback, useEffect, useState } from "react";
import axios from "axios";
import SaveIcon from "../svgs/SaveIcon";
import MovieSearch from "../components/MovieSearch";
import Loading from "../components/Loading";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import MovieCard from "../components/MovieCard";

const API_KEY = process.env.REACT_APP_API_KEY;

const MovieList = () => {
    const [movies, setMovies] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    const [isMovieFetched, setIsMovieFetched] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const location = useLocation();
    const navigate = useNavigate();
    const search = new URLSearchParams(location.search).get("search") || "";

    const updateSearchQuery = useCallback(
        (query) => {
            const searchParams = new URLSearchParams(location.search);
            searchParams.set("search", query);
            navigate({ search: searchParams.toString() });
        },
        [location.search, navigate]
    );

    const fetchData = useCallback(
        async (searchQuery) => {
            if (searchQuery !== "") {
                try {
                    setIsLoading(true);
                    setIsMovieFetched(true);
                    updateSearchQuery(searchQuery);
                    const response = await axios.get(
                        `https://www.omdbapi.com/?apiKey=${API_KEY}&s=${searchQuery}`
                    );
                    setMovies(response.data.Search || []);
                } catch (error) {
                    setIsError(true);
                    toast.error("Something went wrong!");
                    console.error("Error fetching data:", error);
                } finally {
                    setIsLoading(false);
                }
            }
        },
        [updateSearchQuery]
    );

    useEffect(() => {
        setSearchQuery(search);
        fetchData(search);
    }, [search, fetchData]);

    const handleSearch = () => {
        fetchData(searchQuery);
    };

    return (
        <div className="w-full mx-5 md:mx-16 mt-20 md:mt-8 flex flex-col flex-grow">
            <div
                id="cover-card"
                className="flex flex-col border-4 border-red-700 p-6 w-full rounded-md"
            >
                <h1 className="text-2xl md:text-5xl">
                    Welcome to <span className="text-red-600">Watchlists</span>
                </h1>
                <br />
                <p className="text-md md:text-xl md:py-2">
                    Browse movies, add them to watchlists, and share them with
                    friends.
                </p>
                <div className="text-md md:text-xl mt-1">
                    Just click the <SaveIcon /> to add a movie, the poster to
                    see more details, and click to mark the movie as watched.
                </div>
            </div>

            <MovieSearch
                value={searchQuery}
                setValue={setSearchQuery}
                handleSearch={handleSearch}
            />

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
                    {!!movies.length
                        ? movies.map((movie) => (
                              <MovieCard movie={movie} key={movie.imdbID} />
                          ))
                        : isMovieFetched && (
                              <p className="font-semibold">
                                  No Movies Available!
                              </p>
                          )}
                </div>
            )}
        </div>
    );
};

export default MovieList;
