import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { createUser } from "../store/movieWatchListSlice";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

const Register = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const [email, setEmail] = useState("");
    const { isLoggedIn, login } = useAuth();

    // Redirect if user is already logged in
    if (isLoggedIn()) {
        const searchParams = new URLSearchParams(location.search);
        navigate(`/?${searchParams.toString()}`);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!email) return; // Prevent submission if email is empty

        try {
            login(email);
            dispatch(createUser({ userId: email }));
            const searchParams = new URLSearchParams(location.search);
            navigate(`/?${searchParams.toString()}`);
            toast.success("User Registered Successfully!");
        } catch (error) {
            toast.error("Registration failed. Please try again.");
            console.error("Error registering user:", error);
        }
    };

    return (
        <div className="w-full h-screen flex justify-center items-center">
            <div className="max-w-md w-full min-w-fit mx-5 md:mx-auto p-6 m-10 bg-white rounded-lg shadow-2xl text-center">
                <h2 className="text-3xl font-bold mb-4 text-red-600">
                    WatchList
                </h2>
                <h2 className="text-2xl font-semibold mb-4">Sign Up</h2>
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
                        className="w-full bg-red-500 hover:bg-red-700 text-white py-2 rounded-lg"
                    >
                        Register User
                    </button>
                </form>
                <p className="mt-2">
                    Already have an account?{" "}
                    <Link to="/login" className="text-red-500 font-semibold">
                        Login here
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default Register;
