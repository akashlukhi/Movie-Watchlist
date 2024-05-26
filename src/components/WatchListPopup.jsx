import React, { useEffect, useState } from "react";
import PopupContainer from "./PopupContainer";

const WatchListPopup = React.memo((props) => {
    const {
        openPopUp,
        closePopUp,
        onSave,
        setIsNewWatchList,
        setSelectedWatchlistName,
        setSelectedWatchListDescription,
        watchlists,
    } = props;

    const [selectedWatchlist, setSelectedWatchlist] = useState("");
    const [newWatchlistName, setNewWatchlistName] = useState("");
    const [description, setDescription] = useState("");
    const [createNew, setCreateNew] = useState(false);

    const handleStateUpdate = () => {
        setNewWatchlistName("");
        setSelectedWatchlist("");
    };

    const handleClose = () => {
        handleStateUpdate();
        closePopUp();
    };

    const handleSave = () => {
        handleStateUpdate();
        onSave();
    };

    useEffect(() => {
        setCreateNew(selectedWatchlist === "createNew");
    }, [selectedWatchlist]);

    useEffect(() => {
        if (createNew) {
            setSelectedWatchlistName(newWatchlistName);
            setSelectedWatchListDescription(description);
            setIsNewWatchList(true);
        } else {
            setSelectedWatchlistName(selectedWatchlist);
        }
    }, [
        createNew,
        selectedWatchlist,
        newWatchlistName,
        description,
        setSelectedWatchlistName,
        setSelectedWatchListDescription,
        setIsNewWatchList,
    ]);

    return (
        <PopupContainer open={openPopUp} onClose={closePopUp}>
            <h2 className="text-2xl font-semibold mb-4">
                Select the Watchlist
            </h2>
            <div>
                {watchlists?.map((watchlist, index) => (
                    <label
                        key={index}
                        className="flex items-center space-x-2 cursor-pointer"
                    >
                        <input
                            type="radio"
                            name="watchlist"
                            value={watchlist}
                            checked={selectedWatchlist === watchlist}
                            onChange={() => setSelectedWatchlist(watchlist)}
                            className="h-4 w-4 text-red-500"
                        />
                        <span>{watchlist}</span>
                    </label>
                ))}
                <label className="flex items-center space-x-2 cursor-pointer">
                    <input
                        type="radio"
                        name="watchlist"
                        value="createNew"
                        checked={selectedWatchlist === "createNew"}
                        onChange={() => setSelectedWatchlist("createNew")}
                        className="form-radio h-4 w-4 text-red-500"
                    />
                    <span>Create new watchlist</span>
                </label>
                {createNew && (
                    <>
                        <input
                            type="text"
                            placeholder="Enter new watchlist name"
                            className="mt-2 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-red-500"
                            value={newWatchlistName}
                            required
                            onChange={(e) =>
                                setNewWatchlistName(e.target.value)
                            }
                        />
                        <input
                            type="text"
                            placeholder="Enter Description (Optional)"
                            className="mt-2 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-red-500"
                            value={description}
                            required
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </>
                )}
            </div>
            <div className="mt-4 flex justify-end space-x-4">
                <button
                    className="bg-gray-200 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-300"
                    onClick={handleClose}
                >
                    Cancel
                </button>
                <button
                    className="bg-red-500 text-white px-4 py-2 rounded-md disabled:hover:bg-red-500 hover:bg-red-600 disabled:opacity-70"
                    onClick={handleSave}
                    disabled={
                        (!selectedWatchlist && !newWatchlistName) ||
                        (createNew && !newWatchlistName)
                    }
                >
                    Save
                </button>
            </div>
        </PopupContainer>
    );
});

export default WatchListPopup;
