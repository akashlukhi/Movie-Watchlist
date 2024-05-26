import React from "react";

const Loading = React.memo(() => {
    return (
        <div className="flex items-center justify-center w-full h-full">
            <svg
                className="animate-spin h-8 w-8 text-red-500"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
            >
                <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                ></circle>
                <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A8.001 8.001 0 0112 4.472v3.618c-3.217.56-5.733 2.775-6 5.673H6zm2 5.291h3.999c.266 1.12.783 2.132 1.487 3H8v-3.982zM12 20.472a7.965 7.965 0 01-4-1.089V17.37c.32.157.654.282 1 .373V20.47zM14 3.5a8.001 8.001 0 00-7.643 5.291h3.994C10.219 6.765 11.367 6 12.689 6v-2c-.894 0-1.751.197-2.536.544A9.967 9.967 0 0012 4c1.609 0 3.082.594 4.211 1.57l1.417-1.417A7.963 7.963 0 0014 3.5zM17.089 6H20a8.001 8.001 0 00-5.999-5.291V3.5c.72 0 1.419.098 2.089.282V6zM19 10.043h-2.001v-3.99H20A7.965 7.965 0 0119 10.043zM17.413 13H19v3.982h-2.001a8.021 8.021 0 01-1.487-3zM15 17.373v3.618A7.965 7.965 0 0112 20.471v-3.098c.346-.09.68-.216 1-.373zM8.535 17.873a7.948 7.948 0 01-.535-1.873H5v-3.982H7.999V17.873zM4 11.709V7.091A7.965 7.965 0 013.999 12c0 .703.09 1.386.258 2.044l-1.417 1.417C2.595 13.93 4 12.863 4 11.709zM6 19.1V15.09H3.999v3.99H6zM3.999 13.627h2.004V9.636H3.999v3.991zm0-5.964v2.899h2.004V7.663H3.999z"
                ></path>
            </svg>
        </div>
    );
});

export default Loading;
