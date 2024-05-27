import React from "react";

const SaveIcon = React.memo(({ onClick, isMovieInWatchlist = false }) => {
    return (
        <>
            <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 83.02 122.88"
                className="w-[2rem] h-[2rem] md:w-[3rem] md:h-[3rem] opacity-80 inline"
                onClick={onClick}
            >
                <style>{`.st0{fillRule:evenodd;clipRule:evenodd;}`}</style>
                <g>
                    <path
                        style={{
                            fill: isMovieInWatchlist ? "lime" : "black",
                        }}
                        d="M83.02,0L0,0l0.37,122.88l40.99-22.18l40.26,21.88L83.02,0L83.02,0z M47.48,25.82L41.51,7.54 c5.8,0,10.94,1.64,15.46,4.92c4.51,3.27,7.74,7.73,9.73,13.36H47.48L47.48,25.82z M51.14,37.17l15.57-11.31 c0.85,3.05,1.28,5.81,1.28,8.27c0,8.71-3.64,15.82-10.92,21.33L51.14,37.17L51.14,37.17L51.14,37.17z M41.51,44.14l15.56,11.31 c-4.91,3.36-10.1,5.05-15.56,5.05c-5.44,0-10.63-1.68-15.56-5.05L41.51,44.14L41.51,44.14z M31.89,37.17l-5.94,18.28 c-7.28-5.75-10.92-12.88-10.92-21.4c0-2.48,0.44-5.22,1.32-8.2L31.89,37.17L31.89,37.17L31.89,37.17z M35.58,25.82H16.35 c1.94-5.61,5.17-10.05,9.7-13.35c4.53-3.28,9.69-4.93,15.46-4.93L35.58,25.82L35.58,25.82L35.58,25.82z"
                    />
                </g>
            </svg>
        </>
    );
});

export default React.memo(SaveIcon);
