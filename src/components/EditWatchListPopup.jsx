import React, { useEffect, useState } from "react";
import PopupContainer from "./PopupContainer";

const EditWatchListPopup = React.memo(
    ({
        openPopUp,
        closePopUp,
        onSave,
        name,
        description,
        setWatchlistMetaData,
    }) => {
        const [watchlistName, setWatchlistName] = useState(name);
        const [desc, setDesc] = useState(description);

        const handleClose = () => closePopUp();

        const handleSave = () => onSave();

        useEffect(() => {
            setWatchlistMetaData({ name: watchlistName, description: desc });
        }, [watchlistName, desc, setWatchlistMetaData]);

        const handleSubmit = (e) => {
            e.preventDefault();
            handleSave();
        };

        return (
            <PopupContainer open={openPopUp} onClose={closePopUp}>
                <form onSubmit={handleSubmit}>
                    <h2 className="text-2xl font-semibold mb-4">
                        Update Watchlist Name and Description.
                    </h2>
                    <div>
                        <input
                            type="text"
                            placeholder="Enter new watchlist name"
                            className="mt-2 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-red-500"
                            value={watchlistName}
                            required
                            onChange={(e) => setWatchlistName(e.target.value)}
                        />
                        <input
                            type="text"
                            placeholder="Enter Description (Optional)"
                            className="mt-2 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-red-500"
                            value={desc}
                            onChange={(e) => setDesc(e.target.value)}
                        />
                    </div>
                    <div className="mt-4 flex justify-end space-x-4">
                        <button
                            type="button"
                            className="bg-gray-200 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-300"
                            onClick={handleClose}
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="bg-red-500 text-white px-4 py-2 rounded-md disabled:hover:bg-red-500 hover:bg-red-600 disabled:opacity-70"
                            disabled={!watchlistName}
                        >
                            Save
                        </button>
                    </div>
                </form>
            </PopupContainer>
        );
    }
);

export default EditWatchListPopup;
