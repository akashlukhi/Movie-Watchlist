import React, { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    const isLoggedIn = () => {
        if (user) return true;
        if (localStorage.getItem("user")) {
            setUser(localStorage.getItem("user"));
            return true;
        }
        return false;
    };

    const login = (userData) => {
        setUser(userData);
        localStorage.setItem("user", userData);
    };

    const logout = () => {
        setUser("");
        localStorage.removeItem("user");
    };

    return (
        <AuthContext.Provider value={{ user, isLoggedIn, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
