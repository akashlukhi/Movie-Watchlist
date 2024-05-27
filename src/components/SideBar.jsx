import React, { useState, useCallback, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { deleteUser } from "../store/movieWatchListSlice";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import SearchIcon from "../svgs/SearchIcon";
import HomeIcon from "../svgs/HomeIcon";
import Dots from "../svgs/DotsIcon";
import ProfileIcon from "../svgs/ProfileIcon";
import SignOutIcon from "../svgs/SignOutIcon";
import WatchListicon from "../svgs/WatchListIcon";
import DeleteIcon from "../svgs/DeleteIcon";
import SignInIcon from "../svgs/SignInIcon";
import HamburgerIcon from "../svgs/HamburgerIcon";

const SideBar = () => {
    const { user, isLoggedIn, logout } = useAuth();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [searchQuery, setSearchQuery] = useState("");
    const [isSubMenuOpen, setIsSubMenuOpen] = useState(false);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const watchlists = useSelector((state) => state.movies.watchlists[user]);
    const watchlistNames = watchlists?.map((watchlist) => watchlist.name);

    const searchMovie = useCallback(
        (e) => {
            e.preventDefault();
            navigate(`/?search=${searchQuery}`);
            setIsSidebarOpen(false);
        },
        [navigate, searchQuery]
    );

    const toggleSubMenu = useCallback(() => {
        setIsSubMenuOpen((prev) => !prev);
    }, []);

    const handleLogout = useCallback(() => {
        toast.info("User Logged out!");
        toggleSubMenu();
        logout();
    }, [logout, toggleSubMenu]);

    const handleDeleteAccount = useCallback(() => {
        toast.info("User Deleted Successfully!");
        toggleSubMenu();
        dispatch(deleteUser({ userId: user }));
        logout();
    }, [dispatch, logout, toggleSubMenu, user]);

    const toggleSidebar = useCallback(() => {
        setIsSidebarOpen((prev) => !prev);
    }, []);

    useEffect(() => {
        if (isSidebarOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "auto";
        }
    }, [isSidebarOpen]);

    return (
        <>
            <div className="flex flex-row relative">
                {/* Mobile Header */}
                <div className="block md:hidden fixed top-0 left-0 right-0 w-full bg-white shadow-md p-4 flex justify-between items-center z-40">
                    <button onClick={toggleSidebar} className="text-gray-700">
                        <HamburgerIcon />
                    </button>
                    <h5 className="font-bold text-red-500">Watchlists</h5>
                </div>

                {/* Sidebar */}
                <div
                    className={`fixed md:relative top-0 h-full md:h-screen flex flex-col bg-clip-border bg-white text-gray-700 w-[80%] md:max-w-[19rem] p-4 shadow-xl shadow-blue-gray-900/5 transition-transform duration-300 z-40 ${
                        isSidebarOpen ? "translate-x-0" : "-translate-x-full"
                    } md:translate-x-0 md:overflow-hidden`}
                >
                    <div className="mb-2 p-4">
                        <h5 className="block font-sans text-5xl text-center font-bold text-red-500">
                            Watchlists
                        </h5>
                    </div>

                    <nav className="flex flex-col gap-1 min-w-[240px] p-2 font-sans text-base font-normal text-gray-700">
                        <div id="search-bar">
                            <div className="relative">
                                <form onSubmit={searchMovie}>
                                    <input
                                        className="appearance-none border-2 pl-10 border-gray-300 hover:border-gray-400 transition-colors rounded-md w-full py-2 px-3 text-gray-800 leading-tight focus:outline-none focus:ring-red-600 focus:border-red-600 focus:shadow-outline"
                                        id="username"
                                        type="text"
                                        placeholder="Search..."
                                        onChange={(e) =>
                                            setSearchQuery(e.target.value)
                                        }
                                    />
                                    <div className="absolute left-0 inset-y-0 flex items-center">
                                        <SearchIcon />
                                    </div>
                                    <button
                                        type="submit"
                                        className="hidden"
                                    ></button>
                                </form>
                            </div>
                        </div>

                        <Link to={"/"}>
                            <div
                                role="button"
                                tabIndex="0"
                                className="flex items-center w-full p-3 mb-5 mt-9 rounded-md text-start leading-tight transition-all text-white bg-red-500 hover:outline hover:outline-red-800 hover:outline-2"
                                onClick={toggleSidebar}
                            >
                                <div className="grid place-items-center mr-4">
                                    <HomeIcon />
                                </div>
                                Home
                            </div>
                        </Link>

                        <hr className="h-px mx-2 mb-3 border-0 dark:bg-gray-300" />

                        <p className="px-4 font-semibold text-xl mb-2">
                            My Lists
                        </p>

                        {watchlistNames &&
                            watchlistNames?.map((watchlist) => (
                                <Link
                                    to={`watchlist/${watchlist}`}
                                    key={watchlist}
                                    onClick={toggleSidebar}
                                >
                                    <div
                                        role="button"
                                        tabIndex="0"
                                        className="flex items-center w-full p-2 my-1 rounded-md text-start leading-tight transition-all hover:bg-blue-50 hover:bg-opacity-80 focus:bg-blue-50 focus:bg-opacity-80 active:bg-gray-50 active:bg-opacity-80 hover:text-red-600 hover:outline-red-600 focus:outline-red-600 focus:text-red-600 active:text-red-600 outline outline-2 outline-gray-300"
                                    >
                                        <div className="grid place-items-center mr-4">
                                            <WatchListicon />
                                        </div>
                                        {watchlist}
                                    </div>
                                </Link>
                            ))}
                    </nav>
                    <div className="absolute bottom-2 left-0 right-0 p-3 mx-5 my-2 rounded-sm text-start outline outline-gray-300 min-w-[240px] font-sans text-base font-normal text-gray-700 outline-2">
                        <div className="flex justify-between items-center relative">
                            <div className="flex items-center">
                                <div className="grid place-items-center mr-2">
                                    <ProfileIcon />
                                </div>
                                {isLoggedIn() ? user : "GUEST"}
                            </div>
                            <div onClick={toggleSubMenu}>
                                <Dots />
                            </div>
                            {isSubMenuOpen && (
                                <div className="absolute bottom-8 right-[-12px] bg-white border border-gray-200 rounded-md shadow-lg py-1 w-fit">
                                    {isLoggedIn() ? (
                                        <>
                                            <button
                                                className="flex gap-2 w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                                onClick={handleLogout}
                                            >
                                                <SignOutIcon />
                                                Logout
                                            </button>
                                            <button
                                                className="flex gap-2 w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                                onClick={handleDeleteAccount}
                                            >
                                                <DeleteIcon />
                                                Delete Account
                                            </button>
                                        </>
                                    ) : (
                                        <button
                                            className="flex gap-2 w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                            onClick={() => {
                                                navigate("/login");
                                                toggleSidebar();
                                            }}
                                        >
                                            <SignInIcon />
                                            Login
                                        </button>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Backdrop for mobile sidebar */}
                {isSidebarOpen && (
                    <div
                        className="fixed inset-0 bg-black bg-opacity-50 md:hidden z-30"
                        onClick={toggleSidebar}
                    ></div>
                )}

                <Outlet />
            </div>
        </>
    );
};

export default SideBar;
