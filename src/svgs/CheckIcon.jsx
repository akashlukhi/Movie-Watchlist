import React from "react";

const CheckIcon = React.memo(({ onClick, isMovieWatched = false }) => {
    return (
        <>
            <svg
                xmlns="http://www.w3.org/2000/svg"
                version="1.1"
                className="w-[2rem] h-[2rem]"
                viewBox="0 0 256 256"
                xmlSpace="preserve"
                onClick={onClick}
            >
                <defs></defs>
                <g transform="translate(1.4065934065934016 1.4065934065934016) scale(2.81 2.81)">
                    <path
                        d="M 89.122 3.486 L 89.122 3.486 c -2.222 -3.736 -7.485 -4.118 -10.224 -0.742 L 33.202 59.083 c -1.118 1.378 -3.245 1.303 -4.262 -0.151 L 17.987 43.291 c -3.726 -5.322 -11.485 -5.665 -15.666 -0.693 l 0 0 c -2.883 3.428 -3.102 8.366 -0.533 12.036 L 24.206 86.65 c 2.729 3.897 8.503 3.89 11.222 -0.014 l 6.435 -9.239 L 88.87 10.265 C 90.28 8.251 90.378 5.598 89.122 3.486 z"
                        style={{
                            fill: isMovieWatched ? "lime" : "white",
                        }}
                        transform="matrix(1 0 0 1 0 0)"
                        strokeLinecap="round"
                    />
                </g>
            </svg>
        </>
    );
});

export default CheckIcon;
