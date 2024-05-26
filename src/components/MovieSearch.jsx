import React, { useRef, useCallback } from "react";
import SearchIcon from "../svgs/SearchIcon";

const MovieSearch = React.memo(({ handleSearch, value, setValue }) => {
    const inputRef = useRef(null);

    const handleSubmit = useCallback(
        (event) => {
            event.preventDefault();
            handleSearch(inputRef.current.value);
        },
        [handleSearch]
    );

    return (
        <div id="search-bar">
            <form onSubmit={handleSubmit}>
                <div className="relative mt-10">
                    <input
                        className="appearance-none border-2 pl-10 border-gray-300 hover:border-gray-400 transition-colors rounded-md w-full py-3 px-3 text-gray-800 leading-tight focus:outline-none focus:ring-red-600 focus:border-red-600 focus:shadow-outline"
                        id="search-query"
                        ref={inputRef}
                        value={value}
                        onChange={(e) => setValue(e.target.value)}
                        type="text"
                        placeholder="Search..."
                    />
                    <button
                        type="submit"
                        className="bg-red-500 absolute right-0 inset-y-0 flex items-center rounded w-fit p-5 text-white text-xl"
                    >
                        Search
                    </button>

                    <div className="absolute left-0 inset-y-0 flex items-center">
                        <SearchIcon />
                    </div>
                </div>
            </form>
        </div>
    );
});

export default MovieSearch;
