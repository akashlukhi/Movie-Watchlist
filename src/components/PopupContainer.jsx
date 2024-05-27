import { useEffect, useRef } from "react";
import ReactDOM from "react-dom";

const PopupContainer = ({ open, onClose, children }) => {
    const popUpRef = useRef(null);

    useEffect(() => {
        const handleOutsideClick = (event) => {
            if (popUpRef.current && !popUpRef.current.contains(event.target)) {
                onClose();
            }
        };

        if (open) {
            document.addEventListener("pointerdown", handleOutsideClick);
        } else {
            document.removeEventListener("pointerdown", handleOutsideClick);
        }

        return () => {
            document.removeEventListener("pointerdown", handleOutsideClick);
        };
    }, [open, onClose]);

    if (!open) return null;

    return ReactDOM.createPortal(
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div ref={popUpRef} className="bg-white p-8 rounded-lg m-5">
                {children}
            </div>
        </div>,
        document.getElementById("portal-root")
    );
};

export default PopupContainer;
