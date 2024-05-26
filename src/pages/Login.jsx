import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { createUser } from "../store/movieWatchListSlice";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const [email, setEmail] = useState("");
    const { isLoggedIn, login } = useAuth();

    const handleSubmit = (e) => {
        e.preventDefault();
        try {
            login(email);
            dispatch(createUser({ userId: email }));

            const searchParams = new URLSearchParams(location.search);
            navigate(`/?${searchParams.toString()}`);
            toast.success("User Logged in Successfully!");
        } catch (error) {
            console.error("Login failed:", error);
            toast.error("Login failed. Please try again.");
        }
    };

    // Redirect if already logged in
    if (isLoggedIn()) {
        const searchParams = new URLSearchParams(location.search);
        navigate(`/?${searchParams.toString()}`);
    }

    return (
        <div className="w-full h-screen flex justify-center items-center">
            <div className="max-w-md w-full min-w-fit mx-auto p-6 m-10 bg-white rounded-lg shadow-2xl text-center">
                <h2 className="text-[3rem] font-bold mb-4 text-red-600">
                    WatchList
                </h2>
                <h2 className="text-[2rem] font-semibold mb-4">Login</h2>
                <form onSubmit={handleSubmit}>
                    <input
                        type="email"
                        className="w-full border rounded-lg p-2 mb-4"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <button
                        type="submit"
                        disabled={!email}
                        className="w-full bg-red-500 disabled:hover:bg-red-400 disabled:bg-red-400 hover:bg-red-700 text-white py-2 rounded-lg"
                    >
                        Login
                    </button>
                </form>
                <p className="mt-2">
                    Don't have an account?{" "}
                    <Link to="/register" className="text-red-500 font-semibold">
                        Register here
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default Login;
